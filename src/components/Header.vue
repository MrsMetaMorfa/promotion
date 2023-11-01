<template>
  <header class="header container">
    <Logo />
    <button class="header_burger btn btn-link mobile-visible" type="button" @click="openMenu">
      <img :src="require(`@/assets/images/burger.svg`)" alt="Open menu">
    </button>
    <nav class="nav" :class="{'open': isOpen}" @click="closeMenu">
      <button type="button" class="btn btn-close mobile-visible" @click="closeMenu">
        <img :src="require(`@/assets/images/close.svg`)" alt="Закрыть">
      </button>
      <Nav />
      <button class="btn btn-default" @click="this.$parent.OpenPopup">Личный кабинет</button>
      <Picture class="img-cover mobile-visible" v-bind:src="'images/fern'" v-bind:img-type="'png'" v-bind:alt="'Fern leaf'" />
    </nav>
  </header>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import Picture from "@/components/Picture";
export default {
  name: 'Header',
  components: {Logo, Nav, Picture},
  data: () => {
    return {
      isOpen: false
    }
  },
  methods: {
    openMenu() {
      this.isOpen = true
    },
    closeMenu() {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">
.header {
  justify-content: flex-end;
  padding: 3.75vh 9.72vw 0;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -50vw;
  width: 100%;
  align-items: baseline;
  z-index: 1000;
  @media screen and (max-width: 520px) {
    padding: 5.33vw 1.25em 0;
    .navbar {
      justify-content: flex-start;
      align-items: flex-start;
    }
    .nav {
      position: fixed;
      top: 0;
      left: 14.6vw;
      background: white;
      display: none;
      width: 85.4vw;
      height: 100vh;
      padding: 11.67vh 1.25em 1.25em;
      &:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 14.6vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.50);
        z-index: 5999;
      }
      &.open {
        display: block;
        z-index: 6000;
      }
      .img-cover {
        position: absolute;
        bottom: 1em;
        right: 0;
        width: 33.33vw;
      }
    }
    .header_burger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 2.25em;
      height: 2.25em;
      padding: 0 0.47vh;
    }
    .btn-default {
      width: 100%;
      font-size: 5.33vw;
      padding: 0.8em;
      border-radius: .7em;
    }
  }
  .logo {
    width: 9.4vw;
    align-self: center;
    margin-right: auto;
    @media screen and (max-width: 520px) {
      width: 26.67vw;
    }
  }
  .btn-default {
    background: #FFFFFF;
    line-height: 1;
    white-space: nowrap;
    padding-top: 0.89em;
    margin-left: 1.11em;
    @media screen and (max-width: 520px) {
      background: #3C4497;
      color: #FFFFFF;
      margin-left: 0;
    }
  }
}
</style>
