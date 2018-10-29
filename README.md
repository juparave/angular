# angular

## Hiper links on HTML

ref: [Angular RouterLink](https://angular.io/api/router/RouterLink)

```html
    <div class="list-group fs-mini">
        <a *ngFor="let inspection of inspections" [routerLink]="['/app/inspection/summary/', inspection.uid]" class="list-group-item text-ellipsis">
        <div [ngSwitch]="inspection.status()">
            <span *ngSwitchCase="INS_STATUS.ASSIGNED" class="badge badge-pill badge-danger float-right">Asignado</span>
            <span *ngSwitchCase="INS_STATUS.SCHEDULED" class="badge badge-pill badge-warning float-right">Con cita</span>
            <span *ngSwitchCase="INS_STATUS.COMPLETED" class="badge badge-pill badge-primary float-right">Completo</span>
            <span *ngSwitchCase="INS_STATUS.CREATED" class="badge badge-pill badge-warning float-right">Nueva</span>
            <span *ngSwitchCase="INS_STATUS.BILLED" class="badge badge-pill badge-success float-right">Nueva</span>
        </div>
    {% raw %}
        {{ inspection.client?.name }}
        {{ inspection.insured_name.substring(0,8) }}
        {{ inspection.address?.state }}
    {% endraw %}
        </a>
    </div>
```

## DatePipe

ref: [Angular DatePipe](https://angular.io/api/common/DatePipe)

```html
 <div>
   <p>Today is {{today | date}}</p>
   <p>Or if you prefer, {{today | date:'fullDate'}}</p>
   <p>The time is {{today | date:'h:mm a z'}}</p>
   <p>Common used date is {{ todat | date:'dd/MM/yyyy' }}</p>
 </div>
```

