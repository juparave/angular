---
title: "Using jQuery with Angular"
layout: default
nav_order: 14
---
More elegant way without using

    declare var $: any;

First run

    npm install jquery --save
    npm install @types/jquery --save

Then in scripts section in architect => build of angular.json file add path for jquery lib

    "scripts": [
      "node_modules/jquery/dist/jquery.min.js"
    ]

Then in your tsconfig.app.json

    {
      "extends": "../tsconfig.json",
      "compilerOptions": {
        "outDir": "../out-tsc/app",
        "types": ["jquery"] // add here
      },
      "exclude": ["test.ts", "**/*.spec.ts"]
    }

So now you can use jquery anywhere in your project without using declare var $ : any for every file you need to use jquery

ref: [Angular 8 Using Jquery](https://stackoverflow.com/questions/56941924/angular-8-using-jquery)
