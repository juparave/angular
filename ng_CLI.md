# Angular CLI

ref: [angular-cli wiki](https://github.com/angular/angular-cli/wiki)

## Install

    $ npm install -g @angular/cli

## Generating new module

    $ ng generate module sales
    CREATE src/app/sales/sales.module.spec.ts (251 bytes)
    CREATE src/app/sales/sales.module.ts (187 bytes)

## Generating new component

    $ ng generate component app/driver/list/DriverList --module app/driver
    CREATE src/app/driver/list/driver-list/driver-list.component.scss (0 bytes)
    CREATE src/app/driver/list/driver-list/driver-list.component.html (30 bytes)
    CREATE src/app/driver/list/driver-list/driver-list.component.spec.ts (657 bytes)
    CREATE src/app/driver/list/driver-list/driver-list.component.ts (289 bytes)
    UPDATE src/app/driver/driver.module.ts (1571 bytes)

## Example

    # creating sales module
    $ ng generate module sales
    # adding pos component to sales module
    $ ng generate component sales/pos --module sales

## Your global Angular CLI version (7.2.1) is greater than your local version (6.2.9). The local Angular CLI version is used

    $ npm install --save-dev @angular/cli@latest
