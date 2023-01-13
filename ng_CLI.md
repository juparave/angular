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

## Creating example

Create a new ControlPanel module

    $ ng g m modules/ControlPanel
    CREATE src/app/modules/control-panel/control-panel.module.ts (198 bytes)

Create ControlPanel component

    $ ng g c modules/control-panel
    CREATE src/app/modules/control-panel/control-panel.component.scss (0 bytes)
    CREATE src/app/modules/control-panel/control-panel.component.html (28 bytes)
    CREATE src/app/modules/control-panel/control-panel.component.spec.ts (642 bytes)
    CREATE src/app/modules/control-panel/control-panel.component.ts (303 bytes)
    UPDATE src/app/modules/control-panel/control-panel.module.ts (297 bytes)

Create a new Leads module

    $ ng g m modules/Leads
    CREATE src/app/modules/leads/leads.module.ts (191 bytes)

Create Leads component

    $ ng g c modules/leads
    CREATE src/app/modules/leads/leads.component.scss (0 bytes)
    CREATE src/app/modules/leads/leads.component.html (20 bytes)
    CREATE src/app/modules/leads/leads.component.spec.ts (592 bytes)
    CREATE src/app/modules/leads/leads.component.ts (272 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (265 bytes)
