# Node & npm

## Install on OSX

Use [brew](brew.sh)

    $ brew update
    $ brew install Node

## Upgrade Node

    $ brew update
    $ brew upgrade node

## Downgrade node, for compatibility with older packages

    $ brew search node

Find desire package version in the search result list

    $ brew install node@12
    $ brew link node@12

## Using npm update and npm outdated to update dependencies

**npm outdate** to ask npm to list which packages have newer versions available.

```
$ npm outdated
Package                             Current    Wanted   Latest  Location
@angular-devkit/build-angular      0.1000.8  0.1000.8   12.2.0  angular-fe
@angular/animations                 10.0.14    10.2.5   12.2.0  angular-fe
@angular/cli                         10.0.8    10.2.3   12.2.0  angular-fe
@angular/common                     10.0.14    10.2.5   12.2.0  angular-fe
@angular/compiler                   10.0.14    10.2.5   12.2.0  angular-fe
@angular/compiler-cli               10.0.14    10.2.5   12.2.0  angular-fe
@angular/core                       10.0.14    10.2.5   12.2.0  angular-fe
@angular/forms                      10.0.14    10.2.5   12.2.0  angular-fe
@angular/platform-browser           10.0.14    10.2.5   12.2.0  angular-fe
@angular/platform-browser-dynamic   10.0.14    10.2.5   12.2.0  angular-fe
@angular/router                     10.0.14    10.2.5   12.2.0  angular-fe
@types/jasmine                       3.5.14     3.8.2    3.8.2  angular-fe
@types/node                        12.20.19  12.20.19  16.4.13  angular-fe
bootstrap                             4.6.0     4.6.0    5.1.0  angular-fe
jasmine-core                          3.5.0     3.5.0    3.8.0  angular-fe
jasmine-spec-reporter                 5.0.2     5.0.2    7.0.0  angular-fe
karma                                 5.0.9     5.0.9    6.3.4  angular-fe
karma-jasmine                         3.3.1     3.3.1    4.0.1  angular-fe
rxjs                                  6.5.5     6.5.5    7.3.0  angular-fe
ts-node                               8.3.0     8.3.0   10.1.0  angular-fe
typescript                           3.9.10    3.9.10    4.3.5  angular-fe
zone.js                              0.10.3    0.10.3   0.11.4  angular-fe
```

**npm update** npm checks if there exist newer versions out there that satisfy specified 
semantic versioning ranges and installs them.

```
$ npm update
+ @angular/router@10.2.5
+ @angular/cli@10.2.3
+ @angular/platform-browser-dynamic@10.2.5
+ @angular/animations@10.2.5
+ @types/jasmine@3.8.2
+ @angular/platform-browser@10.2.5
+ @angular/forms@10.2.5
+ @angular/compiler-cli@10.2.5
+ @angular/common@10.2.5
+ @angular/compiler@10.2.5
+ @angular/core@10.2.5
```
