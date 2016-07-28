<template>
  <div>{{value | json}}</div>
</template>

<script lang="babel">
  import Vue from 'vue'
  export default {
    created () {
      this.$http.get('https://pokeapi.co/api/v2/pokemon/' +
        this.value.name).then(response => {
          Vue.set(this, 'picture', response.json().sprites.front_default)
        })
    }
  }
</script>
