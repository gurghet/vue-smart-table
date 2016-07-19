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
      <tbody>
      <tr v-for="row in pBody" id="row-{{row._id}}" track-by="_id" :class="trClasses(row._id, row._show)">
        <td
          v-for="col in tableHeader"
          track-by="key"
          :id="'cell-' + row._id + '-' + col.key"
          :class="tdClasses(col.key, row._id) + ' value-cell cell-' + col.key"
        >
        </td><!-- todo: when upgrading to vue 2.x.x put a th here for the mainCol -->
      </tr>
      <!--tr v-if="addRow" class="row-new">
        <td
          v-for="col in tableHeader"
          id="edit-cell-{{col.key}}"
          :class="tdClasses(col.key, '__edit') + ' edit-cell'"
        >
          <div
            id="edit-new-{{col.key}}"
            class="add-row"
            >
            <slot :name="col.key">
            </slot>
          </div>
        </td>
      </tr-->
      </tbody>
    </table>
    <!--div class="add-row-button" v-show="canSaveNewRow"><button class="ui button" @click="saveNewRow">Add Row</button></div-->
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
    name: 'VueSmartTable',
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
        elHarvest: [],
        column2stampMap: {}
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
        required: false,
        default: '_id'
      },
      /* footer: {
        required: false
      },*/
      bodyPath: {
        type: String,
        default: 'body'
      },
      body: {
        type: Array,
        required: false,
        default () {
          return []
        }
      },
      // actions: [Object, Array],
      endpoint: {
        type: String,
        default: 'http://localhost:8080'
      },
      labelCol: {
        type: String,
        default: 'name'
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
      }
    },
    computed: {
      placeholder () {
        if (this.autoLoad) {
          return '...'
        } else {
          return '&#9888'
        }
      },
      tableClassesProcessed () {
        if (this.orderBy !== []) {
          return 'sortable ' + this.tableClasses
        } else {
          return this.tableClasses
        }
      },
      /* processedFooter () {
        if (this.footer === undefined) {
          return []
        }
        if (this.footer.constructor === Array) {
          if (this.footer.length > 0 &&
            this.footer[0].constructor === Array) { // this is a matrix
            return this.footer
          } else { // this is an array
            return [this.footer] // now it is also a matrix
          }
        }
        if (typeof this.footer === 'object') {
          return this.footer
        }
      },*/
      mandatoryFields () {
        return this.tableHeader.filter(col => this.isMandatoryField(col.key))
      },
      canSaveNewRow () {
        return this.mandatoryFields.every(col => this.validate(col, this.newRowInput[col])) && this.addRow
      },
      // fields that right now are visible and editable and should present themselves in the new row if present
      editableFields () {
        return this.tableHeader.filter(col => this.isEditable(col.key))
      },
      tableHeader () {
        // if not every column is a string return as is
        if (!this.header.every(col => typeof col === 'string' || col instanceof String)) {
          if (this.header.some(col => typeof col === 'string' || col instanceof String)) {
            console.error('[Smart Table Error] Some elements of the header are strings while other are not, cannot have a mixed header')
            return
          }
          bodyParsing.camelizeHeader(this.header)
          return this.header
        }
        // else, the header is an array of strings, build one
        // 1. check that the header has the same number of columns as the body
        let body = this.body
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
      },
      mainCol () {
        // choose an appropriate default label column
        if (this.tableHeader.find(col => col.key === this.labelCol) === undefined) {
          return this.tableHeader[0].key
        } else {
          return this.labelCol
        }
      },
      shouldShowId () {
        return this.tableHeader.find(col => col.key === '_id') !== undefined
      }
    },
    beforeCompile () {
      if ((this.body === undefined || this.body.length < 1) && this.autoLoad === false) {
        console.warn('[Smart Table Usage Warning] Body passed is empty, if you want to load data set auto-load to true')
      }

      if (this.autoLoad === false) {
        this.makepBody()
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
          .replace(/\./, 'ʬ').replace(/\+/, 'ʭ')).replace(/ʬ/, '.').replace(/ʭ/, '+')
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
        this.column2stampMap[col] = {
          el () { return el.cloneNode(true) },
          Ctor: res
        }
      })
    },
    compiled () {
      if (this.autoLoad === true) {
        this.refresh()
      } else {
        this.updateInjectedValues()
      }
    },
    watch: {
      'body' () {
        this.makepBody()
      }
    },
    methods: {
      makepBody () {
        let malleableBody = []
        this.body.forEach(row => {
          malleableBody.push(Object.assign({}, row, {_show: true}))
        })
        Vue.set(this, 'pBody', malleableBody)
        bodyParsing.derivedBody(this.pBody, this.tableHeader.map(c => c.key))
        bodyParsing.bodyWithIds(this.pBody, this.idCol)
        // this.$nextTick(() => {
        this.updateInjectedValues()
        // })
      },
      compareFunction (sortKey) {
        let child = this.$children.find(c => c.col === sortKey)
        return child.compareFunction
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
        this.$http.get(this.endpoint).then((response) => {
          let retBody = []
          if (this.bodyPath.length === 0) {
            retBody = response.data
          } else {
            retBody = response.data[this.bodyPath]
          }
          Vue.set(this, 'body', retBody)
          this.makepBody()
          this.$dispatch('successful-request')
          this.$dispatch('after-request')
          this.$set('error', false)
          this.updateInjectedValues()
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
      /**
       * Wait before the table actually finishes rendering
       * before calling this function since it writes only
       * based on what it finds on the DOM
       */
      updateInjectedValues () {
        function byId (id) {
          return function (row) {
            // we cast row._id to string because we are going
            // to extract id from a string, so there is no
            // chance that it retains its original type
            return String(row._id) === id
          }
        }
        let smartTable = this
        Array.from(this.$el.querySelectorAll('.value-cell')).forEach(cellEl => {
          let [, id, col] = cellEl.id.match(/^cell-([a-zA-Z0-9 ._-]+)-([a-zA-Z0-9.+]+)$/)
          let comp = this.$children.find(c => c.id === id && c.col === col)
          if (comp === undefined) {
            // new, create!
            let dataMixin = {
              data () {
                let defaultValue = this.constructor.options.data ? this.constructor.options.data().value : undefined
                return {
                  editable: smartTable.isEditable(col),
                  value: smartTable.pBody.find(byId(id))[col] || defaultValue,
                  mode: 'readOnly',
                  col,
                  id
                }
              }
            }
            let smartMethods = {
              methods: {
                enterEditMode () {
                  this.$dispatch('enterEditMode', {id: this.id, col: this.col})
                },
                saveNewValue () {
                  this.$dispatch('saveNewValue', {id: this.id, col: this.col})
                },
                cancel () {
                  this.$dispatch('cancel', {id: this.id, col: this.col})
                }
              }
            }
            let compOptions = Object.assign({
              el: smartTable.column2stampMap[col] ? smartTable.column2stampMap[col].el : document.createElement('plain-text'),
              mixins: [dataMixin, smartMethods],
              parent: smartTable
            })
            let Ctor = this.column2stampMap[col] ? this.column2stampMap[col].Ctor : Vue.extend(PlainText)
            comp = new Ctor(compOptions)
            // manually appending the child
            cellEl.appendChild(comp.$el)
            // manually appending will not trigger normal
            // ready hook, fire the hook:attached event manually
            comp.$dispatch('hook:attached')
          } else {
            // old, refresh
            comp.value = smartTable.pBody.find(byId(id))[col] || comp.Ctor && comp.Ctor.options.data().value
          }
        })
      },
      // this field, if visible, should be editable and present in the new row
      isEditable (col) {
        return this.editable.indexOf(col) !== -1
      },
      /**
       *
       * @param resource {value, id, col}
       * @param httpRESTreq if false will not propagate PUT request
         */
      put (resource, httpRESTreq = true) {
        this.$dispatch('before-request')
        let child = this.$children.find(c => c.id === resource.id && c.col === resource.col)
        if (child === undefined) {
          console.error('Children with id ' + resource.id + ' was not found')
          return
        }
        Vue.set(child, 'mode', 'saving')
        if (httpRESTreq) {
          this.$http.put(this.endpoint + '/' + resource.id + '/' + resource.col, {
            action: 'edit',
            value: resource.value
          }).then((response) => {
            Vue.set(child, 'mode', 'readOnly')
            Vue.set(child, 'value', resource.value)
            this.$dispatch('successful-request')
            this.$dispatch('after-request')
            this.$set('error', false)
            this.maybeRefresh()
          }, (response) => {
            Vue.set(child, 'mode', 'readOnly')
            this.$set('error', {status: response.status, data: response.data.error})
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
        bodyParsing.sortedBody(this.pBody, col, this.reverseOrder, this.compareFunction(col))
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
      }
    },
    events: {
      'saveNewValue' ({id, col}) {
        let child = this.$children.find(c => c.id === id && c.col === col)
        if (id === '____add-row') {
          this.newRowInput[col] = child.newValue
        } else {
          if (child.mode === 'edit') {
            this.put({value: child.newValue, id, col})
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
          child.mode = 'edit'
          child.newValue = child.value
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
              child.newValue = undefined
            }
          }, 120)
        }
      },
      'filter' ({filter, col}) {
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
          bodyParsing.filteredBody(this.pBody, filter, col, cumulative)
          cumulative = true
        })
      }
    }
  }
</script>

<style>

  .bottom-right-corner {
    font-size: 42px;
    float: left;
    height: 1px;
    top: -25px;
    position: relative;
    width: 32px;
    left: 5px;
    pointer-events: none;
    cursor: default;
  }

  .action-label {
    text-transform: capitalize;
  }

  table input[type="checkbox"] {
    transform: scale(1.4);
    margin: 0;
  }

  .error-panel {
    width: 100%;
    height: 50px;
    background-color: #260707;
    color: #c8999e;
  }

  .click-cue {
    width: 1em;
    height: 1em;
  }
</style>
