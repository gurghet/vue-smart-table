<template>
  <div>
    <img v-if="mode === 'readOnly'" :src="value" @click="enterEditMode">
    <input v-if="mode === 'edit'" type="text" v-model="newValue">
    <button v-if="mode === 'edit'" @click="saveNewValue">&#128190;</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    }
  }
</script>
