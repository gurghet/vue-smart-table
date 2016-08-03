<template>
  <div class="smart-table table-responsive">
    <slot><!--here all the custom components will end--></slot>
    <table :class="tableClassesProcessed">
      <thead>
      <tr>
        <th v-for="col in tableHeader" class="col-{{col.key}} col-cell {{canOrderBy(col.key) ? 'ord' : ''}} {{orderClass(col.key)}}" @click="doOrderBy(col.key)" track-by="key">
          {{col.label || col.key}}
        </th>
      </tr>
      </thead>
      <tfoot>
        <tr v-for="footer in footers">
          <th
            :colspan="tableHeader.length"
            :class="tdFooterClasses(footer) + ' footer-row'"
            :id="footer + (tableId ? ('-' + tableId) : '')">
            <component :is="footer" :current-page="currentPage" :num-pages="numPages" :body="pBody" :header="tableHeader" :statics="statics" :meta="meta"></component>
          </th>
        </tr>
      </tfoot>
      <tbody>
      <tr v-for="row in bodyPage" :id="'row-' + row._id + (tableId ? ('-' + tableId) : '')" track-by="_id" :class="trClasses(row._id, row._show)">
        <td
          v-for="col in tableHeader"
          track-by="key"
          :id="'cell-' + row._id + '-' + col.key + (tableId ? ('-' + tableId) : '')"
          :class="tdClasses(col.key, row._id) + ' value-cell cell-' + col.key"
        >
          <component :is="col.key" :value="row[col.key]" :id="row._id" :col="col.key" :editable="isEditable(col.key)"></component>
        </td><!-- todo: when upgrading to vue 2.x.x put a th here for the mainCol -->
      </tr>
      </tbody>
    </table>
    <div class="error-panel" v-show="error">{{error | json}}</div>
  </div>
</template>

<script lang="babel">
  import PlainText from './PlainText'
  import Vue from 'vue'
  import bodyParsing from './bodyParsing'
  var pascalCase = require('pascal-case')
  var camelCase = require('camel-case')
  Vue.component('plain-text', PlainText)
  const commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i
  export default {
    name: 'SmartTable',
    data () {
      return {
        error: false,
        // newRowInput: {},
        orderKey: undefined,
        reverseOrder: false,
        additionalTdClasses: [], // [col][id][class1, class2...]
        mandatory: [], // [col]true|false
        filters: [], // {filter: string or function, col: string or array of strings}
        pBody: [],
        meta: undefined,
        elHarvest: [],
        column2stampMap: {},
        counter: {c: 0},
        footerTemplates: [],
        footerComponents: [],
        footers: [],
        statics: [],
        staticsToAdd: [],
        currentPage: 1
      }
    },
    props: {
      tableClasses: {
        type: String,
        default: 'ui celled table'
      },
      autoLoad: Boolean,
      autoRefresh: Boolean,
      header: {
        type: Array,
        default () {
          return []
        }
      },
      orderBy: {
        type: Array,
        default () {
          return []
        }
      },
      idCol: {
        type: String,
        default: '_id'
      },
      bodyPath: {
        type: String,
        default: 'body'
      },
      body: {
        type: Array,
        default () {
          return []
        }
      },
      endpoint: {
        type: String,
        default: undefined
      },
      editable: {
        type: Array,
        default () {
          return []
        }
      },
      addRow: {
        type: Boolean,
        default: false
      },
      itemsPerPage: {
        type: Number,
        default: 20
      }
    },
    computed: {
      numPages () {
        return Math.ceil(this.pBody.filter(i => i._show === true).length / this.itemsPerPage)
      },
      tableId () {
        return this.$options._ref ? this.$options._ref : ''
      },
      bodyPage () {
        return bodyParsing.returnPage(this.pBody, {itemsPerPage: this.itemsPerPage, currentPage: this.currentPage})
      },
      tableClassesProcessed () {
        if (this.orderBy !== []) {
          return 'sortable ' + this.tableClasses
        } else {
          return this.tableClasses
        }
      },
      mandatoryFields () {
        return this.tableHeader.filter(col => this.isMandatoryField(col.key))
      },
      canSaveNewRow () {
        return this.mandatoryFields.every(col => this.validate(col, this.newRowInput[col])) && this.addRow
      },
      tableHeader () {
        // if not every column is a string return as is
        if (!this.header.every(col => typeof col === 'string' || col instanceof String)) {
          if (this.header.some(col => typeof col === 'string' || col instanceof String)) {
            console.error('[Smart Table Error] Some elements of the header are strings while other are not, cannot have a mixed header')
            return
          }
          bodyParsing.camelizeHeader(this.header)
          // create static data
          this.header.filter(c => c.static !== undefined).forEach(c => {
            if (c.key === undefined && typeof c.static === 'string') {
              c.key = c.static
            }
            if (Array.isArray(c.static)) {
              this.staticsToAdd.push(...c.static)
            } else {
              this.staticsToAdd.push(c.static)
            }
          })
          return this.header
        }
        // else, the header is an array of strings, build one
        // 1. check that the header has the same number of columns as the body
        let body = this.body || []
        // columns is the set of all the columns in the body
        let columns = [...new Set([].concat.apply([], body.map(row => Object.keys(row))))]
        // filter hidden columns (columns with keys that start with underscore)
        columns = columns.filter(col => !/^_/.test(col))
        let header = []
        if (this.header.length < 1) {
          header = columns
        } else {
          header = this.header
        }
        if (header.length !== columns.length) {
          console.error('[Smart Table Error] The number of columns specified ' +
          header.length +
          ' does not match the number of columns in the body ' + columns.length)
        }
        // build the tableHeader object
        let finalHeader = []
        header.forEach((colLabel, i) => {
          finalHeader[i] = {key: columns[i], label: header[i]}
        })

        bodyParsing.camelizeHeader(finalHeader)
        return finalHeader
      }
    },
    beforeCompile () {
      if ((this.body === undefined || this.body.length < 1) && this.autoLoad === false) {
        console.warn('[Smart Table Usage Warning] Body passed is empty, if you want to load data set auto-load to true')
      }
      if (this.autoLoad === true && this.endpoint === undefined) {
        console.error('[Smart Table Usage Error] Auto-load was set to true, but there is no endpoint prop set (ensure that it is a static prop, with no :)')
      }

      if (this.autoLoad === false) {
        this.makepBody()
        this.addStatics()
      }

      // Deprecation warning for slot
      // todo: _content is not available in vue 2.x.x, _renderChildren should be
      // used as a second option (maybe with duck typing to sense the vue version)
      if (this.$options._content !== undefined) {
        Array.from(this.$options._content.querySelectorAll('[slot]')).forEach(el => {
          console.warn('[Smart Table Deprecation Warning] "slot" is deprecated use "col" instead')
          el.setAttribute('col', el.getAttribute('slot'))
        })
        // Harvest all the custom components from the slot
        Array.from(this.$options._content.querySelectorAll('[col]')).forEach(el => {
          this.elHarvest.push(this.$options._content.removeChild(el))
        })
        // Harvest the footer elements
        Array.from(this.$options._content.querySelectorAll('footer')).forEach(el => {
          const footerComponent = el.getAttribute(':is') || el.getAttribute('v-bind:is')
          if (footerComponent) {
            this.footerComponents.push(footerComponent)
          }
          this.footerTemplates.push(this.$options._content.removeChild(el))
        })
        // Drain spurious elements draining the slot
        this.$options._content.innerHTML = ''
      }

      // build stamp library
      this.elHarvest.forEach(el => {
        let tag = el.tagName.toLowerCase()
        // todo: these fillinig character are phonetic letters, this mean
        // discouraging language students and professionals from using
        // the table, need to find a better solution.
        let col = camelCase(el.attributes.col.value.replace(/\-/, ' ')
          .replace(/\./, 'ʬ').replace(/\+/, 'ʭ').replace(/_/, 'ʫ')).replace(/ʬ/, '.').replace(/ʭ/, '+').replace(/ʫ/, '_')
        if (commonTagRE.test(tag)) {
          console.error('[Smart Table Usage Error] HTML element"' + tag +
          '" cannot be a component. Skipping')
          return
        }
        // the plain-text is an exception because we don't expect the user to register a built-in component
        // so we won't find it in the $root's components let's add it manually
        this.$root.$options.components.PlainText = Vue.extend(PlainText)

        let res = this.$root.$options.components[tag] ||
                  this.$root.$options.components[camelCase(tag)] ||
                  this.$root.$options.components[pascalCase(tag)]

        if (res === undefined) {
          console.error('[Smart Table Usage Error] Component "' + tag +
          '" was not found. Make sure the component is registered before ' +
          'you instantiate your root Vue instance. Skipping')
          return
        }
        const baseMixin = res.options
        const dataMixin = {
          data () {
            return {
              valueBeforeEnteringEditMode: undefined
            }
          }
        }
        const propsMixin = {
          props: {
            editable: Boolean,
            value: {},
            mode: { type: String, default: 'readOnly' },
            col: String,
            id: {}
          }
        }
        const initProps = {
          init () {
            Array.from(el.attributes).forEach(att => {
              this.$options.el.setAttribute(att.name, att.value)
            })
          }
        }
        const smartMethods = {
          methods: {
            enterEditMode () {
              this.$dispatch('enterEditMode', {id: this.id, col: this.col})
            },
            saveNewValue () {
              this.$dispatch('saveNewValue', {id: this.id, col: this.col})
            },
            cancel () {
              this.$dispatch('cancel', {id: this.id, col: this.col})
            },
            statics (staticName) {
              return this.$parent.statics.find(s => s._id === this.id)[staticName]
            }
          }
        }
        this.$options.components[col] = Vue.extend({
          mixins: [baseMixin, dataMixin, propsMixin, initProps, smartMethods] // todo: also copy content
        })
      })
      // build footers
      let smartFooter = {
        components: this.$root.$options.components,
        props: ['currentPage', 'numPages', 'body', 'header', 'statics', 'meta'],
        methods: {
          pag (p) {
            this.$dispatch('pagination', { goTo: p })
          },
          offset (length = 5) {
            return Math.max(1, Math.min(this.numPages - (length - 1), Math.round(this.currentPage - length / 2)))
          }
        }
      }
      let counter = 0
      this.footerTemplates.forEach(el => {
        this.$options.components['footer' + counter] = Vue.extend({
          template: el.innerHTML,
          mixins: [smartFooter]
        })
        this.footers.push('footer' + counter)
        counter++
      })
      this.footerComponents.forEach(cmpName => {
        const res = this.$root.$options.components[cmpName] ||
                    this.$root.$options.components[camelCase(cmpName)] ||
                    this.$root.$options.components[pascalCase(cmpName)]
        const baseMixin = res.options
        this.$options.components['footer' + counter] = Vue.extend({
          mixins: [baseMixin, smartFooter]
        })
        this.footers.push('footer' + counter)
        counter++
      })
    },
    compiled () {
      if (this.autoLoad === true) {
        this.refresh()
      }
    },
    watch: {
      'body' () {
        this.makepBody()
        this.addStatics()
      },
      'endpoint' () {
        this.refresh()
      }
    },
    methods: {
      makepBody () {
        let malleableBody = []
        const body = this.body || []
        body.forEach(row => {
          malleableBody.push(Object.assign({}, row, {_show: true}))
        })
        Vue.set(this, 'pBody', malleableBody)
        bodyParsing.bodyWithIds(this.pBody, this.idCol)
        bodyParsing.deriveBody(this.pBody, this.tableHeader.map(c => c.key))
        this.applyFilters()

        // destroy removed components
        let insistingIds = this.pBody.map(r => r._id)
        let childrenToRemove = this.$children.filter(c => c.id && insistingIds.indexOf(c.id) === -1)
        childrenToRemove.forEach(c => c.$destroy())

        // register all missing components as PlainText
        this.tableHeader.map(col => col.key).forEach(col => {
          if (this.$options.components[col] === undefined) {
            this.$options.components[col] = Vue.extend(PlainText)
          }
        })
      },
      addStatics () {
        this.staticsToAdd.forEach(s => {
          this.pBody.forEach(row => {
            const curVal = this.statics.find(_s => _s._id === row._id)
            if (curVal === undefined) {
              this.statics.push({ _id: row._id, [s]: { v: undefined } })
            } else {
              if (curVal[s] === undefined) {
                Object.assign(curVal, { [s]: { v: undefined } })
              }
            }
          })
        })
        // destroy removed components statics
        let insistingIds = this.statics.map(s => s._id)
        let staticsIdsToRemove = insistingIds.filter(s => this.pBody.map(r => r._id).indexOf(s) === -1)
        staticsIdsToRemove.map(sId => this.statics.find(s => s._id === sId)).forEach(s => this.statics.$remove(s))
        this.staticsToAdd = []
      },
      compareFunction (sortKey) {
        let child = this.$children.find(c => c.col === sortKey)
        return child.compareFunction
      },
      tdFooterClasses (index) {
        return ''
      },
      tdClasses (col, id) {
        let acc = ''
        if (this.isEditable(col)) {
          acc += 'selectable '
        }
        if (this.additionalTdClasses[col] === undefined) {
          this.additionalTdClasses[col] = []
        }
        if (this.additionalTdClasses[col][id] === undefined) {
          this.additionalTdClasses[col][id] = []
        }
        this.additionalTdClasses[col][id].forEach(additionalTdClass => (acc += ' ' + additionalTdClass))
        return acc
      },
      trClasses (id, show) {
        if (show) {
          return ''
        } else {
          return 'smart-filter custom-filter'
        }
      },
      refresh () {
        this.$dispatch('before-request')
        this.$http.get(this.endpoint).then(response => {
          let retBody = []
          if (this.bodyPath.length === 0) {
            retBody = response.data
          } else {
            retBody = response.data[this.bodyPath]
            this.meta = response.data
            delete this.meta[this.bodyPath]
          }
          if (retBody === undefined) {
            console.warn('[Smart Table Warning] Received body was empty. Body-path used was: \'' + this.bodyPath + '\'')
          }
          Vue.set(this, 'body', retBody)
          this.makepBody()
          this.$dispatch('successful-request')
          this.$dispatch('after-request')
          this.$set('error', false)
        }, (response) => {
          this.$set('error', { status: response.status, data: response.data.error })
          this.$dispatch('failed-request')
          this.$dispatch('after-request')
        })
      },
      maybeRefresh () {
        if (this.autoRefresh) {
          this.refresh()
        }
      },
      saveNewRow () {
        if (this.canSaveNewRow) {
          this.$dispatch('before-request')
          this.$http.post(this.endpoint, {action: 'addRow', resource: this.newRowInput}).then((response) => {
            this.$set('error', false)
            this.$set('body', response.data.body)
            this.$dispatch('successful-request')
            this.$dispatch('after-request')
            this.maybeRefresh()
          }, (response) => {
            this.$set('error', {status: response.status, data: response.data})
            this.$dispatch('failed-request')
            this.$dispatch('after-request')
          })
        }
      },
      validate (col, value) {
        return (value !== undefined && value !== '')
        // todo: hook for external validation
      },
      // this field, if visible, should be editable and present in the new row
      isEditable (col) {
        return this.editable.indexOf(col) !== -1 ||
               this.editable.map(c => camelCase(c)).indexOf(col) !== -1 ||
               this.editable.map(c => pascalCase(c)).indexOf(col) !== -1
      },
      /**
       *
       * @param resource {value, id, col}
       * @param httpRESTreq if false will not propagate PUT request
         */
      put ({value, id, col, child}, httpRESTreq = true) {
        let childDidntExplicitlySetAValue = value === undefined
        let valueToSend = value || child.value
        this.$dispatch('before-request')
        Vue.set(child, 'mode', 'saving')
        if (httpRESTreq) {
          this.$http.put(this.endpoint + '/' + id + '/' + col, {
            action: 'edit',
            value: valueToSend
          }).then(response => {
            Vue.set(child, 'mode', 'readOnly')
            this.$dispatch('successful-request')
            this.$dispatch('after-request')
            this.maybeRefresh()
          }, response => {
            Vue.set(child, 'mode', 'readOnly')
            if (childDidntExplicitlySetAValue) {
              Vue.set(child, 'value', child.valueBeforeEnteringEditMode)
            }
            this.$dispatch('error', {table: this.$options._ref, status: response.status, data: response.data})
            this.$dispatch('failed-request')
            this.$dispatch('after-request')
          })
        }
      },
      post (resource, httpRESTreq = true) {
        setTimeout(() => {
          // 1) sends request
          // 2) receive reply
          // 3) if ok add row to body and reset new row
        }, 1000)
      },
      isPlainObject (obj) {
        return obj !== null && typeof obj === 'object'
      },
      isMandatoryField (col) {
        if (this.mandatory[col] === false) {
          // console.log(col + 'is explicitly non mandatory')
          return false
        }
        return this.mandatory[col] || this.isEditable(col)
        // todo: subject to change
      },
      doOrderBy (col) {
        if (!this.canOrderBy(col)) {
          return
        }
        if (this.orderKey === col) {
          this.reverseOrder = !this.reverseOrder
        } else {
          this.reverseOrder = false
        }
        this.orderKey = col
        bodyParsing.sortBody(this.pBody, col, this.reverseOrder, this.compareFunction(col))
      },
      orderClass (col) {
        if (this.orderKey === col && this.reverseOrder === false) {
          return 'sorted ascending'
        }
        if (this.orderKey === col && this.reverseOrder === true) {
          return 'sorted descending'
        }
        return ''
      },
      canOrderBy (col) {
        return this.orderBy.indexOf(col) !== -1
      },
      isNumeric (n) {
        return !!(+('1' + n) || +(n + '1')) && !Array.isArray(n) && isFinite(n) && (n !== '')
      },
      onFailure (response) {
        this.$set('error', {status: response.status, data: response.data.error})
        this.$dispatch('failed-request')
        this.$dispatch('after-request')
      },
      onSuccess (response) {
        let body = ''
        if (this.bodyPath.length === 0) {
          body = response.data
        } else {
          body = response.data[this.bodyPath]
        }
        if (body !== undefined || body === {}) {
          this.$set('body', body)
        }
        this.$dispatch('successful-request')
        this.$dispatch('after-request')
        this.$set('error', false)
        this.maybeRefresh()
      },
      applyFilters () {
        let cumulative = false
        this.filters.forEach(f => {
          let filter = f.filter
          let col = f.col
          // intercept the filter in case we have a custom component to
          // check if they have a custom filter function
          if (typeof col === 'string' || col.length === 1 && Array.isArray(col)) {
            let comp = this.$children.find(c => c.col === col)
            if (comp && comp.filterFunction !== undefined) {
              filter = comp.filterFunction(filter)
            }
          }
          bodyParsing.filterBody(this.pBody, filter, col, cumulative)
          cumulative = true
        })
      }
    },
    events: {
      'pagination' ({goto}) {
        let targetPage = -1
        if (goto === this.currentPage) {
          return
        }
        if (goto === 'next' && this.currentPage < this.numPages) {
          targetPage = this.currentPage + 1
        }
        if (goto === 'prev' && this.currentPage > 1) {
          targetPage = this.currentPage - 1
        }
        if (Number.isInteger(goto)) {
          targetPage = goto
        }
        if (targetPage !== -1) {
          this.currentPage = targetPage
        }
      },
      'saveNewValue' ({id, col, value}) {
        let child = this.$children.find(c => c.id === id && c.col === col)
        if (child === undefined) {
          console.error('[Smart Table Error] Component with id ' + id + ' in column ' + col + 'was not found')
        }
        if (id === '____add-row') {
          this.newRowInput[col] = child.newValue
        } else {
          if (child.mode === 'edit') {
            this.put({value, id, col, child})
          }
        }
      },
      'enterEditMode' ({id, col}) {
        let child = this.$children.find(c => c.id === id && c.col === col)
        if (child.mode === 'readOnly') {
          if (!child.editable) {
            console.log('Clicked non-editable field ' + col + '-' + id + '. Ignoring.')
            return
          }
          child.valueBeforeEnteringEditMode = child.value
          child.mode = 'edit'
        }
      },
      'cancel' ({id, col}) {
        if (id === '____add-row') {
          return
        }
        let child = this.$children.find(c => c.id === id && c.col === col)
        if (child.mode === 'edit') {
          setTimeout(() => {
            if (child.mode === 'edit') {
              child.mode = 'readOnly'
              child.value = child.valueBeforeEnteringEditMode
            }
          }, 120)
        }
      },
      'filter' ({filter, col, table = this.tableId}) {
        if (table !== this.tableId) {
          return
        }
        function sameCols (col1, col2) {
          if (col1 === col2) return true
          if (col1.length !== col2.length) return false
          col1.forEach((c, i) => { if (c !== col2[i]) return false })
          return true
        }
        // update or create the filter
        let currentFilter = this.filters.find(f => sameCols(f.col, col))
        if (currentFilter === undefined) {
          // no existing filter, new!
          this.filters.push({filter, col})
        } else {
          this.filters.splice(this.filters.indexOf(currentFilter), 1)
          this.filters.push({filter, col})
        }
        this.applyFilters()
      }
    }
  }
</script>

<style>
  .smart-filter {
    display: none;
  }
</style>
