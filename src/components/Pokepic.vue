<template>
  <img :src="picture"></img>
</template>

<script lang="babel">
  import Vue from 'vue'
  export default {
    created () {
      this.$http.get('https://pokeapi.co/api/v2/pokemon-form/' +
        this.value.name).then(response => {
          Vue.set(this, 'picture', response.json().sprites.front_default)
        })
    }
  }
</script>
