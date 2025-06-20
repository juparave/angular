---
title: "Dynamically Set Page Title"
layout: default
nav_order: 8
---
# dynamically-set-page-title-in-angular

ref: https://dev.to/nightwolfdev/dynamically-set-page-title-in-angular-app-35ca

`admin-layout.routing.ts`
```typescript
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TankComponent } from '../../pages/tank/tank.component';
import { TankFormComponent } from '../../pages/tank/tank-form/tank-form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'tanks',      component: TankComponent },
    { path: 'tanks/form',      component: TankFormComponent, data: {title: 'Tank Form'} },
    { path: 'tanks/form/:tankId',      component: TankFormComponent, data: {title: 'Tank Form'}},
];
```

`navbar.component.ts`
```typescript
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  private defaultPageTitle = undefined;
  public isAuthenticated = false;
  public username = '';

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

    this.setPageTitle();
  }

  ngOnInit() {
    this.authService.getAuthenticatedUser().subscribe(user => {
      if (user.id == null) {
        this.isAuthenticated = false;
        this.username = '';
      } else {
        this.isAuthenticated = true;
        this.username = user.username;
      }
    });

    this.authService.authenticationChanged.subscribe(() => {
      this.authService.getAuthenticatedUser().subscribe(user => {
        if (user.id == null) {
          this.isAuthenticated = false;
          this.username = '';
        } else {
          this.isAuthenticated = true;
          this.username = user.username;
        }
      });
    });

    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }

  getTitle() {
    if (this.defaultPageTitle !== '' && this.defaultPageTitle != undefined) return this.defaultPageTitle;
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  }
  
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  private setPageTitle(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
  
        if (!child) {
          return this.activatedRoute.snapshot.data.title || this.defaultPageTitle;
        }
  
        while (child.firstChild) {
          child = child.firstChild;
        }
  
        if (child.snapshot.data.title) {
          return child.snapshot.data.title || this.defaultPageTitle;
        }
      })
    ).subscribe((title: string) => this.defaultPageTitle = title);
  }
}
```
