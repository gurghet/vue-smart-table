# vuesmarttable

> A vue table with dynamic components

## Usage

``` bash
npm install vue-smart-table --save
```
In your app then you write (assuming you use ES6):

``` javascript
import 'vue-smart-table'
let SmartTable = window.SmartTable
...
Vue.use(VueResource)
Vue.component('smart-table', SmartTable)
```

After that you can freely use it in your templates:

``` html
<smart-table :body="{1:{hello:'world'}}"></smart-table>
```

*nota bene: I know this is not the best way to import a component for use in a Vue.js project,
if anyone knows how to do it properly please send me a message, javascript is not
my native language*

## Documentation

For the moment being I'll collect all documentation at the following link:

http://forum.vuejs.org/topic/4140/vue-smart-table

I will move it to a dedicated website as soon as possible.

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