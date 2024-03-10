# GoogleMaps

## Install dependencies

    $ npm install @agm/core --save-dev
    $ npm install @types/googlemaps --save-dev

## To import on components

```javascript
import {} from "googlemaps";
```

Add a file at your projects root directory called index.d.ts and insert the following:

```javascript
declare module 'googlemaps';
```