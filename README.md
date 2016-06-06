# vue-smart-table

> A vue table with dynamic components

![vue smart table](http://s33.postimg.org/tbffbcza7/2016_05_29_15_20_48.png)[Demo](http://codepen.io/gurghet/pen/gMOoPB)

## Usage

``` bash
npm install vue-smart-table --save
```
In your app then you write (assuming you use ES6):

``` javascript
import SmartTable from "vue-smart-table"
Vue.component('smart-table', SmartTable)
```

After that you can freely use it in your templates:

``` html
<smart-table :body="{1:{hello:'world'}}"></smart-table>
```

## Documentation

For the moment being I'll collect all documentation at the following link:

http://forum.vuejs.org/topic/4140/vue-smart-table

I will move it to a dedicated website as soon as possible.

## Current branch, yet to release breaking changes

The format of the body will be soon turned into the following (__current branch, not yet in npm__):

``` json
[ { _id: 3 , name: 'John'  , surname: 'Smith' },
  { _id: 92, name: 'Fulano', surname: 'Perro' } ]
```

## Contribute

``` bash
# install dependencies
npm install

# serve demo app  with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit
```

##Changelog

###2.0.0 [Not released yet!]

- The format of the body is completely changed to a more standard format (see above)

###1.0.5

- stains the global scope with SmartTable constructor

###1.0.4

Working on break dependencies on other modules
- build now yields only two files
- external dependencies now needs to be available in global namespace
    - Ramda
    - jQuery
    - Vue
    - VueResource
