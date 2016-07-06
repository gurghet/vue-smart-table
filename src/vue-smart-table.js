require('core-js/fn/array/find')
let SmartTable = require('./components/SmartTable.vue')
window.SmartTable = SmartTable
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('smart-table', SmartTable)
}

module.exports = SmartTable
