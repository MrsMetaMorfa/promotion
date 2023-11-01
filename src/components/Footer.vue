<template>
  <footer class="footer container">
    <Nav />
  </footer>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav";

export default {
  name: 'Footer',
  components: {Nav}
}
</script>

<style lang="scss">
.footer {
  justify-content: center;
  padding: 0 9.72vw 40px;
  margin-top: auto;
  justify-self: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 500;
  @media screen and (max-width: 520px) {
    align-items: center;
    padding: 0 0 0;
  }
}
</style>
