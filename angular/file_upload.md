---
title: "File Upload"
layout: default
nav_order: 10
---
# Angular File Uploader


* [Flask 2.* doc](https://flask.palletsprojects.com/en/2.0.x/patterns/fileuploads/)
* [Angular Material File Uploader](https://owrrpon.medium.com/angular-material-file-uploader-b78aa070f77d)
* [Angular Material File Uploader repo](https://github.com/owrrpon/modhyobitto-angular)

### Service function

This function only uploads form files

```ts
  upload(files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    files.forEach((file: File) => {
      formData.append('files', file, file.name);
    });

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
```

### Backend

```go
// UploadFile uploads a file to the server
func UploadFile(c *fiber.Ctx) error {
	// Parse multipart form file
	form, err := c.MultipartForm()
	if err != nil {
		return err
	}

	// Get all files from "files" key:
	files := form.File["files"]
	uploads := make([]*models.Upload, 0)

    // Get all files from "files" key:
	// Loop through files and move them to the specified location.
	for _, file := range files {
		// Save the files to disk:
		filename := util.SanitizeFilename(file.Filename, false)
		// timestamp in the form of 20060102150405
		ts := time.Now().Format("20060102150405")
		// add timestamp to filename before the extension
		filename = fmt.Sprintf("%s-%s%s",
			strings.TrimSuffix(filename, filepath.Ext(filename)),
			ts,
			filepath.Ext(filename))
		// join target directory with filename
		dest := filepath.Join(targetDir, filename)
		app.InfoLog.Println("UploadFile: saving file to", dest)
		if err := c.SaveFile(file, dest); err != nil {
			return nil, err
		}
		// process file
		comp, err := cfdi.ReadFile(dest)
		if err != nil {
			app.ErrorLog.Println("UploadFile: error parsing file", err)
			return nil, fmt.Errorf("error parising file: %s", err)
		}
		// zip file
		archive := filepath.Join(targetDir, filename+".zip")
		if err := util.ZipFile(archive, dest, true); err != nil {
			app.ErrorLog.Println("UploadFile: error zipping file", err)
		}

		// app.InfoLog.Println("UploadFile: file parsed", comp)
		upload, err := prepareUpload(userID, dest, file, comp)
		if err != nil {
			app.ErrorLog.Println("UploadFile: error preparing upload", err)
		}
		uploads = append(uploads, upload)
	}

	return c.JSON(uploads)
}

```

### Component

Keeping track with `progressInfo`

```ts
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadService.upload([file]).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // add response to fileInfos
            this.fileInfos.push(...event.body);
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }
```
