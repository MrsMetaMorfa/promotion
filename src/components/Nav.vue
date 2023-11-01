<template>
  <ul class="navbar container">
    <li class="navbar_item">
      <a class="navbar_link btn btn-link" @click="scrollTo('prime')">Главная</a>
    </li>
    <li class="navbar_item">
      <a class="navbar_link btn btn-link" @click="scrollTo('prizes')">Призы</a>
    </li>
    <li class="navbar_item">
      <a class="navbar_link btn btn-link">Как учавствовать</a>
    </li>
    <li class="navbar_item">
      <a class="navbar_link btn btn-link">Вопросы и ответы</a>
    </li>
  </ul>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Nav',
  components: {},
  methods: {
    scrollTo (id) {
      const el = document.getElementById(id)

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

}
</script>

<style lang="scss">
.nav {
  &bar {
    align-items: center;
    justify-content: center;
    width: 100%;
    @media screen and (max-width: 520px) {
      flex-direction: column;
    }
    &_item {
      color: #000;
      text-transform: uppercase;
      padding: 0 1.11em;
      font-size: 1.25vw;
      line-height: 1.33;
      font-weight: 700;
      white-space: nowrap;
      @media screen and (max-width: 520px) {
        font-size: 4.8vw;
        margin: 0 0 2.22em;
      }
    }
  }
}
</style>
