<template>
  <div :class="classes" @click="edit">
    <input v-if="editable && mode === 'edit'" type="text" v-model="value" @blur="save" :disabled="saving">
    <span v-if="mode === 'readOnly'">{{value}}</span>
  </div>
</template>

<script>
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
          acc.push('pointer-cursor')
        }
        return acc.join(' ')
      }
    },
    methods: {
      save () {
        this.saving = true
        this.saveData.then(() => {
          Vue.set(this, 'value', 'bau')
          Vue.set(this, 'saving', false)
          Vue.set(this, 'mode', 'readOnly')
        })
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
</style>