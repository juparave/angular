# File downloads

### Service function

In the case of xml content, set `responseType` to `text`

```ts
  /**
   * Retrieves the XML representation of an invoice by its ID.
   * @param id - The ID of the invoice.
   * @returns A promise that resolves to the XML content of the invoice.
   */
  getInvoiceXMLById(id: string) {
    const url = `${this.baseUrl}${this.serviceUrl}/xml/${id}`;

    return this.httpClient.get(url, { responseType: 'text' });
  }
```

### Backend

Go fiber handler

```go
func GetInvoiceXML(c *fiber.Ctx) error {
	id := c.Params("id")
	userID := c.Locals("userID").(string)

	var invoice models.Invoice
	result := app.DB.
		Preload("Upload").
		Where("id = ? and user_id = ?", id, userID).First(&invoice)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Invoice not found",
		})
	}

	// filename of file to be unzipped
	xmlFilename := filepath.Base(invoice.Upload.Filepath)

	// read zip file, the `Filepath` field contains the path to the zip file without the extension
	b, err := util.ReadZipFile(invoice.Upload.Filepath+".zip", xmlFilename)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error reading zip file",
		})
	}

	c.Set("Content-Type", "application/xml")
	c.Set("Content-Disposition", "attachment; filename="+xmlFilename)
	return c.Send(b)
}
```

### Component

```ts
  downloadXML(invoiceId: string, uuid: string) {
    this.invoiceService.getInvoiceXMLById(invoiceId).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'text/xml' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${uuid}.xml`;
      link.click();
    });
  }
```
