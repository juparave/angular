## DatePicker

Using NgbModule you need to convert initial value

```javascript
    /**
    * fixInitialDateValue
    * @param datePipe datePipe service, must be declare before use 
    *                 in components module, then initilized in components constructor
    * @param dateValue 
    * @returns formatted date
    */
    export function fixInitialDateValue(datePipe: DatePipe, dateValue: Date) {
    let value = {};
    try {
        const birthYear = Number(datePipe.transform(dateValue, 'yyyy'));
        const birthMonth = Number(datePipe.transform(dateValue, 'MM'));
        const birthDay = Number(datePipe.transform(dateValue, 'dd'));
        value = {
        year: birthYear,
        month: birthMonth,
        day: birthDay
        };
    }
    catch (e) {
        console.error(e);
        value = null;
    }

    return value;
    }
```