<template>
  <div>
    <span class="label_">tel.</span>
    <span class="phone">{{value.phone}}</span>
    <span class="label_">cell.</span>
    <span class="cell">{{value.cell}}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: {}
      }
    }
  }
</script>

<style scoped>
div {
  width: 13em;
  font-family: monospace;
}
.phone {
  float: right;
  clear: right;
  display: block;
}

.cell {
  float: right;
  clear: right;
  display: block;
}

.label_ {
  float: left;
  clear: left;
  display: block;
}
</style>
