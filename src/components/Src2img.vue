<template>
  <div>
    <img v-if="mode === 'readOnly'" :src="value" @click="enterEditMode">
    <input v-if="mode === 'edit'" type="file">
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
