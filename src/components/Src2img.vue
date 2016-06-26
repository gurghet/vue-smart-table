<template>
  <div class="ui input">
    <img v-if="mode === 'readOnly'" :src="value" @click="edit">
    <input v-if="mode === 'edit' || mode === 'saving'" type="text" v-model="newValue" @keyup.27="cancel" @blur="cancel" :disabled="mode === 'saving'">
    <button v-if="mode === 'edit' && id !== '____add-row'" @click="saveNewValue">&#128190;</button>
  </div>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        value: '',
        newValue: ''
      }
    },
    methods: {
      edit () {
        this.enterEditMode()
        this.$nextTick(() => {
          this.$el.querySelector('input').focus()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: center;
    img {
      cursor: pointer;
    }
  }
</style>
