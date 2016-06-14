<template>
  <p>{{pvalue}}</p>
</template>

<script>
  export default {
    data () {
      return {
        value: '',
        pvalue: ''
      }
    },
    watch: {
      'value' (val) {
        this.$http.get('https://restcountries.eu/rest/v1/alpha/' + val)
          .then(res => this.$set('pvalue', res.data.name))
      }
    }
  }
</script>
