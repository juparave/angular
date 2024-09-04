## Angular Forms

## Theming

ref: https://mdbootstrap.com/docs/angular/forms/basic/


## Reactive Forms

```ts
  private fb = inject(FormBuilder);

  private initializeForm() {
    this.form = this.fb.group({
      id: [''],
      account_id: [''],
      name: ['', Validators.required],
      address: [''],
      location: [''],
      addressInput: [null],
      settings: this.fb.group({
        restaurant_points: [0],
        manager_points: [0],
        waiter_points: [0],
      }),
      notes: [''],
    });
  }
```

```html
<form
  [formGroup]="form"
  (ngSubmit)="onSubmit()"
  novalidate>
  <mat-card class="shipping-card">
    <mat-card-header>
      <mat-card-title>Restaurant</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="row">
        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Nombre</mat-label>
            <input matInput placeholder="Nombre" formControlName="name" />
            <mat-error>Valor <strong>requerido</strong></mat-error>
          </mat-form-field>
        </div>
      </div>

      <h4>Distribución de puntos (%)</h4>
      <div class="row" formGroupName="settings">
        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Restaurante</mat-label>
            <input matInput type="number" placeholder="Restaurante" formControlName="restaurant_points" />
            <mat-error>Valor <strong>requerido</strong></mat-error>
          </mat-form-field>
        </div>
        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Gerente</mat-label>
            <input matInput type="number" placeholder="Gerente" formControlName="manager_points" />
            <mat-error>Valor <strong>requerido</strong></mat-error>
          </mat-form-field>
        </div>
        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Mesero</mat-label>
            <input matInput type="number" placeholder="Mesero" formControlName="waiter_points" />
            <mat-error>Valor <strong>requerido</strong></mat-error>
          </mat-form-field>
        </div>
      </div>
    </mat-card-content>
  </mat-card>
</form>
```
