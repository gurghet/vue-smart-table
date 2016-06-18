<template>
  <div :class="classes" @click="edit">
    <input
      v-if="mode === 'edit' || mode === 'saving'"
      type="text" v-model="newValue"
      @blur="save"
      @keyup.13="save"
      @keyup.27="cancel"
      :disabled="mode === 'saving'"
    >
    <span v-if="mode === 'readOnly'">{{value}}</span>
  </div>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        value: undefined,
        newValue: undefined,
        id: undefined,
        col: undefined,
        editable: true,
        mode: 'readOnly'
      }
    },
    computed: {
      classes () {
        let acc = []
        if (this.editable && this.mode === 'readOnly') {
          acc.push('pointer-cursor full-height')
        }
        if (this.mode === 'edit' || this.mode === 'saving') {
          acc.push('ui input') // semantic ui input
          acc.push('padding') // semantic ui fix
          acc.push('input-group') // bootstrap
        }
        return acc.join(' ')
      }
    },
    methods: {
      cancel () {
        if (this.mode === 'edit') {
          this.mode = 'readOnly'
          this.newValue = undefined
        }
      },
      save () {
        if (this.mode === 'edit') {
          this.$parent.put({value: this.newValue, id: this.id, col: this.col})
        }
      },
      edit () {
        if (this.editable) {
          this.mode = 'edit'
          this.newValue = this.value
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
