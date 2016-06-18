<template>
  <div :class="classes" @click="edit">
    <input
      v-if="editable && mode === 'edit'"
      type="text" v-model="value"
      @blur="save"
      @keyup="saveK"
      :disabled="saving"
    >
    <span v-if="mode === 'readOnly'">{{value}}</span>
  </div>
</template>

<script lang="babel">
  import Vue from 'vue'
  let editTemplate = `
    <input type="text" v-model="value" @blur="save">
  `
  export default {
    data () {
      return {
        value: undefined,
        editTemplate,
        editable: true,
        mode: 'readOnly',
        saving: false,
        saveData: new Promise((resolve) => resolve())
      }
    },
    computed: {
      classes () {
        let acc = []
        if (this.editable && this.mode === 'readOnly') {
          acc.push('pointer-cursor full-height')
        }
        if (this.mode === 'edit') {
          acc.push('ui input') // semantic ui input
          acc.push('padding') // semantic ui fix
          acc.push('input-group') // bootstrap
        }
        return acc.join(' ')
      }
    },
    methods: {
      saveK (e) {
        if (e.keyCode === 13) {
          this.save()
        }
      },
      save () {
        if (this.saving === false) {
          console.log('saving was false setting it to true')
          this.saving = true
          this.saveData.then(() => {
            const idSplit = this.$el.id.match(/^value-([a-zA-Z0-9 ._-]+)-([^-]+)/)
            const id = idSplit[1]
            const col = idSplit[2]
            console.log('saving was true setting it to false')
            Vue.set(this, 'saving', false)
            Vue.set(this, 'mode', 'readOnly')
            console.log('will dispatsh')
            this.$dispatch('save-value', {value: this.value, id, col})
          })
        } else {
          console.log('saving is true doing nothing')
        }
      },
      edit () {
        if (this.editable) {
          this.mode = 'edit'
          this.$nextTick(() => {
            this.$el.querySelector('input').focus()
          })
        }
      }
    }
  }
</script>

<style scoped>
  .pointer-cursor {
    cursor: pointer;
  }
  .full-height {
    display: flex;
    padding: 0.71428571em;
    vertical-align: middle;
  }
  .padding {
    padding: 0.71428571em;
  }
</style>
