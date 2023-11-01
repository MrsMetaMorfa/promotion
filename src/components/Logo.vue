<template>
  <div class="logo">
    <img :src="require(`@/assets/images/logo.svg`)" alt="Акция">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Logo',
  components: {}
}
</script>

<style lang="scss">
.logo {}
</style>
