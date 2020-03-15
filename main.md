# angular

* [angular-cli](ng_CLI.md)

## Hiper links on HTML

ref: [Angular RouterLink](https://angular.io/api/router/RouterLink)
ref: [Routing & Navigation](https://angular.io/guide/router)

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

```html
    <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
    link to user component
    </a>

    <h2>HEROES</h2>
    <ul class="heroes">
        <li *ngFor="let hero of heroes$ | async"
            [class.selected]="hero.id === selectedId">
            <a [routerLink]="['/hero', hero.id]">
            <span class="badge">{{ hero.id }}</span>{{ hero.name }}
            </a>
        </li>
    </ul>
```

```javascript
    // on routing module
    const heroesRoutes: Routes = [
        { path: 'heroes',  component: HeroListComponent, data: { animation: 'heroes' } },
        { path: 'hero/:id', component: HeroDetailComponent, data: { animation: 'hero' } }
    ];

```

```javascript
    ngOnInit() {
        // query snapshot
        this.debug = this.route.snapshot.queryParamMap.get("debug");
        // query subscribe
        this.route.queryParamMap.subscribe(queryParams => {
            this.debug = queryParams.get("debug")
        });
        // param snapshop
        this.hero_id = this.route.snapshot.paramMap.get("id");
        // query subscribe
        this.route.paramMap.subscribe(params => {
            this.hero_id = params.get("id")
        });
    }
```

## Navigate from controller

```javascript
    gotoHeroes(hero: Hero) {
        let heroId = hero ? hero.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Include a junk 'foo' property for fun.
        this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
    }
```

## Obtaining route parameter

When you know for certain that a HeroDetailComponent instance will never, never, ever be re-used, you can simplify the code with the snapshot.

The route.snapshot provides the initial value of the route parameter map. You can access the parameters directly without subscribing or adding observable operators. It's much simpler to write and read:

```javascript
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: HeroService
    ) {}


    ngOnInit() {
        // route parameter
        let id = this.route.snapshot.paramMap.get('id');
        this.hero$ = this.service.getHero(id);

        // query parameter
        let aid = this.route.snapshot.queryParamMap.get('aid');
        // aid != null && aid != ""
        if (aid) {
            this.loadAppointment(aid);
        }

    }
```

## DatePipe

ref: [Angular DatePipe](https://angular.io/api/common/DatePipe)

```html
{% raw %}
 <div>
   <p>Today is {{today | date}}</p>
   <p>Or if you prefer, {{today | date:'fullDate'}}</p>
   <p>The time is {{today | date:'h:mm a z'}}</p>
   <p>Common used date is {{ today | date:'dd/MM/yyyy' }}</p>
 </div>
{% endraw %}
```


## ngFor with ng-template

ref: [Angular ngFor, <ng-tempalte> and the compiler](https://toddmotto.com/angular-ngfor-template-element)

```html
{% raw %}
<ng-template [ngIf]="inspection.status() == INS_STATUS.SCHEDULED">
    <ng-template ngFor let-appointment [ngForOf]="inspection.appointments">
    <span class="badge badge-warning">{{ appointment.start | date:'dd/MM/yyyy' }}</span>&nbsp;
    </ng-template>
</ng-template>
{% endraw %}
```

## Enumeration

```javascript
    export enum INSPECION_STATUS {
        CREATED = 1,
        ASSIGNED,
        SCHEDULED,
        REPORTED,
        COMPLETED,
        DELIVERED,
        BILLED
    }

    export enum STOWAGE_STATUS {
        NORMAL = 1,
        CONSUMED,
        IN_TRANSFER,
        OUT,
        LOST,
        RESERVED
    }
```
