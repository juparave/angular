# Angular CLI

ref: [Angular CLI Documentation](https://angular.dev/cli)

## Install

    $ npm install -g @angular/cli

## Generating new module

    $ ng generate module sales
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

Create a ReassignLeadModalComponent

    $ ng g c modules/leads/ReassignLeadModal
    CREATE src/app/modules/leads/reassign-lead-modal/reassign-lead-modal.component.scss (0 bytes)
    CREATE src/app/modules/leads/reassign-lead-modal/reassign-lead-modal.component.html (34 bytes)
    CREATE src/app/modules/leads/reassign-lead-modal/reassign-lead-modal.component.spec.ts (678 bytes)
    CREATE src/app/modules/leads/reassign-lead-modal/reassign-lead-modal.component.ts (326 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (657 bytes)

Create Agents Service

    $ ng g s services/agents
    CREATE src/app/services/agents.service.spec.ts (357 bytes)
    CREATE src/app/services/agents.service.ts (135 bytes)

Create a StatusUpdateModalComponent

    $ ng g c modules/leads/UpdateStatusModal
    CREATE src/app/modules/leads/update-status-modal/update-status-modal.component.scss (0 bytes)
    CREATE src/app/modules/leads/update-status-modal/update-status-modal.component.html (34 bytes)
    CREATE src/app/modules/leads/update-status-modal/update-status-modal.component.spec.ts (678 bytes)
    CREATE src/app/modules/leads/update-status-modal/update-status-modal.component.ts (326 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (787 bytes)

Create a LeadsFilterModalComponent

    $ ng g c modules/leads/LeadsFilterModal
    CREATE src/app/modules/leads/leads-filter-modal/leads-filter-modal.component.scss (0 bytes)
    CREATE src/app/modules/leads/leads-filter-modal/leads-filter-modal.component.html (33 bytes)
    CREATE src/app/modules/leads/leads-filter-modal/leads-filter-modal.component.spec.ts (671 bytes)
    CREATE src/app/modules/leads/leads-filter-modal/leads-filter-modal.component.ts (322 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (913 bytes)

Create a DatesFilterModalComponent

    $ ng g c modules/leads/DatesFilterModal
    CREATE src/app/modules/leads/dates-filter-modal/dates-filter-modal.component.scss (0 bytes)
    CREATE src/app/modules/leads/dates-filter-modal/dates-filter-modal.component.html (33 bytes)
    CREATE src/app/modules/leads/dates-filter-modal/dates-filter-modal.component.spec.ts (671 bytes)
    CREATE src/app/modules/leads/dates-filter-modal/dates-filter-modal.component.ts (322 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (1039 bytes)

Create a LeadTableComponent

    $ ng g c modules/leads/LeadsTable
    CREATE src/app/modules/leads/leads-table/leads-table.component.scss (0 bytes)
    CREATE src/app/modules/leads/leads-table/leads-table.component.html (26 bytes)
    CREATE src/app/modules/leads/leads-table/leads-table.component.spec.ts (628 bytes)
    CREATE src/app/modules/leads/leads-table/leads-table.component.ts (295 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (1139 bytes)

Create a LeadDetailFormComponent

    $ ng g c modules/leads/LeadDetailForm
    CREATE src/app/modules/leads/lead-detail-form/lead-detail-form.component.scss (0 bytes)
    CREATE src/app/modules/leads/lead-detail-form/lead-detail-form.component.html (31 bytes)
    CREATE src/app/modules/leads/lead-detail-form/lead-detail-form.component.spec.ts (657 bytes)
    CREATE src/app/modules/leads/lead-detail-form/lead-detail-form.component.ts (314 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (1257 bytes)

Create a LeadActivityTableComponent

    $ ng g c modules/leads/LeadActivityTable
    CREATE src/app/modules/leads/lead-activity-table/lead-activity-table.component.scss (0 bytes)
    CREATE src/app/modules/leads/lead-activity-table/lead-activity-table.component.html (34 bytes)
    CREATE src/app/modules/leads/lead-activity-table/lead-activity-table.component.spec.ts (678 bytes)
    CREATE src/app/modules/leads/lead-activity-table/lead-activity-table.component.ts (326 bytes)
    UPDATE src/app/modules/leads/leads.module.ts (1387 bytes)
