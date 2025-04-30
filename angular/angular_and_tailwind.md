---
title: "Angular and Tailwind"
layout: default
nav_order: 2
---

# Angular and Tailwind

## Create Angular project

Create a new project named `angular-fe`

    $ ng new angular-fe
    ? Would you like to add Angular routing? `Yes`
    ? Which stylesheet format would you like to use? `SCSS`   [ https://sass-lang.com/documentation/syntax#scss

## Add Tailwind dependencies

ref: https://tailwindcss.com/docs/guides/angular

    $ npm install -D tailwindcss postcss autoprefixer
    $ npx tailwindcss init

That creates a base Tailwind CSS file: `tailwind.config.ts`

### Tailwind Forms plugin

ref: https://github.com/tailwindlabs/tailwindcss-forms

    $ npm install -D @tailwindcss/forms

Then add the plugin to your `tailwind.config.js` file:

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
```

### Tailwind Elements

ref: https://tailwind-elements.com/

    $ npm install -D tw-elements

Tailwind Elements is a plugin and should be included inside the `tailwind.config.js` file. It is also recommended to extend the content array with a js file that loads dynamic component classes:

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin'),
  ]
}
```

Add to `angular.json` Tailwind-elements js dependency

```javascript
// angular.json
"projects": {
    // ...
    "angular-fe": {
        // ...
        "architect": {
            // ...
            "build": {
                // ...
                "scripts": [
                    "node_modules/tw-elements/dist/js/index.min.js"
                ]
                //..
            }
        }
    }
}
```

## Add the Tailwind directives to your CSS

Add the @tailwind directives for each of Tailwind’s layers to your `./src/styles.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```