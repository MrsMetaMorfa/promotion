<template>
  <picture>
    <source type="image/webp" :srcset="require(`@/assets/${src}.webp`) + ' 1x,' + require(`@/assets/${src}@2x.webp`) + ' 2x'">
    <img
      :src="require(`@/assets/${src}.${imgType}`)"
      :srcset="require(`@/assets/${src}.${imgType}`) + ' 1x, ' + require(`@/assets/${src}@2x.${imgType}`) + ' 2x'"
      :alt="alt"
    >
  </picture>
</template>

<script>
export default {
  name: 'Picture',
  props: {
    imgType: {
      type: String,
      default: 'png',
      required: true
    },
    src: {
      type: String,
      default: 'img',
      required: true
    },
    alt: {
      type: String,
      default: 'Awesome image'
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
