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

## UpperCase Directive

```javascript
    import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

    /** usage:
        <input type="text" class="form-control" placeholder="ID"
                formControlName="id" [(ngModel)]="form.value.id" uppercase/>
    */

    @Directive({
        selector: '[ngModel][uppercase]'
    })
    export class UppercaseDirective {
        @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
        value: any;

        @HostListener('input', ['$event']) onInputChange($event) {
            this.value = $event.target.value.toUpperCase();
            this.ngModelChange.emit(this.value);
        }
    }
```