<template>
  <div>
    <span class="label">tel.</span>
    <span class="phone">{{value.phone}}</span>
    <span class="label">cell.</span>
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
  width: 160px;
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

.label {
  float: left;
  clear: left;
  display: block;
}
</style>