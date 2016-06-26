/**
 * Created by gurghet on 26/06/16.
 */

import Vue from 'vue'
// Vue.use(require('vue-resource'))
// Vue.config.debug = true
// import SmartTable from 'src/components/SmartTable'
// var $ = require('jquery')
// chai.use(require('chai-dom'))
import PlainText from 'src/components/PlainText'
let testBody = [{_id: 0, name: 'Gennaro', age: 34}, {_id: 1, name: 'Marco', age: 22}]

describe('PlainTextComponent', () => {
  it('should dispatch the enterEditMode event when edit is called', (done) => {
    const vm = new Vue({
      template: '<div><plain-text  v-ref:ut></plain-text></div>',
      components: {PlainText},
      data: {testBody},
      events: {
        enterEditMode () {
          done()
        }
      }
    }).$mount()
    Vue.set(vm.$refs.ut, 'editable', false)
    vm.$children[0].edit()
  })
})
