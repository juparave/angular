---
title: "ng generate (Angular CLI)"
layout: default
nav_order: 16
---
# ng generate

## Modules

Create a login module

  $ ng generate module login --route login --module app.module

Create a Material Table

`ng generate @angular/material:table <component-name>`

  $ ng generate @angular/material:table views/mytable --module app.module
  
## Services

Create auth service

  $ ng generate service auth/auth --skip-tests

## Interfaces

Create Login interface

  $ ng generate interface interfaces/login

## Classes

Create User class and service

  $ ng generate class shared/user/user
  $ ng generate service shared/user/user
