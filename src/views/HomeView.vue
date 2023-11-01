<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import {mapGetters, mapMutations} from "vuex";

export default {
  components: {
    Picture,
    Header,
    Footer
  },
  data: () => {
    return {
      isPopupOpen: false,
      popup: {
        registration: {
          isOpen: false,
          form: {
            name: 'Ivanov Ivan Ivanovich',
            email: 'user@test.com',
            phone: '+71234567890',
            isAccept: true,
          }
        },
        greeting: {
          isOpen: false,
          message: 'ФИО, указанное при регистрации'
        }
      },
    }
  },
  computed: {
    ...mapGetters(['get_result', 'get_user'])
  },
  methods: {
    ...mapMutations([
      'UPDATE_RESULT_ERROR_LOGIN',
      'UPDATE_RESULT_ERROR_NAME',
      'UPDATE_RESULT_ERROR_PHONE',
      'UPDATE_RESULT_ERROR_RULES',
      'UPDATE_RESULT_SUCCESS'
    ]),
    OpenPopup() {
      this.isPopupOpen = true;
      this.popup.registration.isOpen = true;
    },
    ClosePopup() {
      this.isPopupOpen = false;
      this.popup.registration.isOpen = false;
      this.popup.greeting.isOpen = false;
    },
    Submit() {
      if (this.popup.registration.form.name && this.popup.registration.form.email && this.popup.registration.form.phone && this.popup.registration.form.isAccept) {
        this.UPDATE_RESULT_SUCCESS(true);
        this.$store.state.reg_form.name = this.popup.registration.form.name;
        this.$store.state.reg_form.login = this.popup.registration.form.email;
        this.$store.state.reg_form.phone = this.popup.registration.form.phone;
        this.$store.state.reg_form.rules1 = this.popup.registration.form.isAccept;

        console.log(this.$store.state.reg_form)
        this.$store.dispatch('PostForm')
          .then(() => {
              console.log(this.$store.state.result)
            }
          )
      }

      if (this.popup.registration.form.name === '') {
        this.UPDATE_RESULT_ERROR_NAME.push("Необходимо заполнить «Имя».")
      } else {
        this.UPDATE_RESULT_ERROR_NAME([])
      }
      if (this.popup.registration.form.email === '') {
        this.UPDATE_RESULT_ERROR_LOGIN.push("Необходимо заполнить «E-mail».")
      } else {
        this.UPDATE_RESULT_ERROR_LOGIN([])
      }
      if (this.popup.registration.form.phone === '') {
        this.UPDATE_RESULT_ERROR_PHONE.push("Необходимо заполнить «Телефон».")
      } else {
        this.UPDATE_RESULT_ERROR_PHONE([])
      }
      if (!this.popup.registration.form.isAccept) {
        this.UPDATE_RESULT_ERROR_RULES.push("Необходимо принять условия.")
      } else {
        this.UPDATE_RESULT_ERROR_RULES([])
      }


      setTimeout(() => {
        this.popup.registration.isOpen = false;
        this.popup.greeting.isOpen = true;
      }, 5000)
    }
  }
}
</script>

<template>
  <div class="promotion container container--column">
    <Header />
    <section class="prime text-center container" id="prime">
      <div class="prime_left">
        <Picture class="img-cover" v-bind:src="'images/bottle'" v-bind:img-type="'png'" v-bind:alt="'Bottle with lemon and leaf'" />
      </div>
      <div class="prime_content">
        <h1 class="prime_title title">Участвуй <br class="mobile-hidden"> в акции и выигрывай призы!</h1>
        <button class="btn btn-default btn-action" @click="OpenPopup">Участвовать</button>
      </div>
      <div class="prime_right">
        <Picture class="img-cover" v-bind:src="'images/leaf'" v-bind:img-type="'png'" v-bind:alt="'Leaf'" />
        <Picture class="img-cover mobile-hidden" v-bind:src="'images/bubbles'" v-bind:img-type="'png'" v-bind:alt="'Bubbles'" />
        <picture class="img-cover">
          <img :src="require(`@/assets/images/prize_main.svg`)" alt="Главный приз 500 000 Р">
        </picture>
        <Picture class="img-cover" v-bind:src="'images/super'" v-bind:img-type="'png'" v-bind:alt="'Bundle'" />
      </div>
    </section>
    <section class="prizes" id="prizes">
      <picture class="img-cover bg-image mobile-hidden">
        <img :src="require(`@/assets/images/confetti.svg`)" alt="Конфетти">
      </picture>
      <Picture class="img-cover bg-image mobile-hidden" v-bind:src="'images/lemon'" v-bind:img-type="'png'" v-bind:alt="'Lemon'" />
      <div class="prizes_content">
        <h2 class="title section_title text-center">Выигрывай призы</h2>
        <h3 class="section_subtitle text-center">Гарантированный приз</h3>
        <div class="prizes_guaranty box container">
          <Picture class="img-cover" v-bind:src="'images/yandex'" v-bind:img-type="'png'" v-bind:alt="'Yandex bundle'" />
          <p class="box_text">Зарегистрируйте один чек и получите подписку Яндекс Плюс на 1 год</p>
        </div>
        <h3 class="section_subtitle text-center">Ежемесячный приз</h3>
        <ul class="prizes_list container">
          <li class="box box-bright container container--column">
            <Picture class="img-cover" v-bind:src="'images/prize_scooter'" v-bind:img-type="'png'" v-bind:alt="'Электросамокат'" />
            <h4 class="box_text text-center">Электросамокат</h4>
          </li>
          <li class="box box-bright container container--column">
            <Picture class="img-cover" v-bind:src="'images/prize_alice'" v-bind:img-type="'png'" v-bind:alt="'Колонка'" />
            <h4 class="box_text text-center">Колонка</h4>
          </li>
          <li class="box box-bright container container--column">
            <Picture class="img-cover" v-bind:src="'images/prize_watch'" v-bind:img-type="'png'" v-bind:alt="'Смарт часы'" />
            <h4 class="box_text text-center">Смарт часы</h4>
          </li>
        </ul>
        <button class="btn btn-default btn-action" @click="OpenPopup">Загрузить чек</button>
      </div>
    </section>
    <Footer />

    <div class="popup container" v-if="isPopupOpen" @click.self="ClosePopup">
      <div class="popup_box box box-bright" v-if="popup.registration.isOpen">
        <button type="button" class="btn btn-close" @click="ClosePopup">
          <img :src="require(`@/assets/images/close.svg`)" alt="Закрыть">
        </button>
        <h2 class="title box_title text-center">Регистрация</h2>
        <form class="form" id="registration" method="post" @submit.prevent="Submit">
          <div class="form_line">
            <label for="name" class="form_label">ФИО</label>
            <input type="text" name="name" id="name"
                   :class="{'error' : this.get_result.error.name[0]}" placeholder="Николаев Дмитрий Сергеевич"
                   v-model="popup.registration.form.name">
            <p class="form_error" v-if="this.get_result.error.name[0]">{{this.get_result.error.name[0]}}</p>
          </div>
          <div class="form_line">
            <label for="email" class="form_label">E-mail</label>
            <input type="email" name="email" id="email"
                   :class="{'error' : this.get_result.error.login[0]}" placeholder="username@gmail.com"
                   v-model="popup.registration.form.email">
            <p class="form_error" v-if="this.get_result.error.login[0]">{{this.get_result.error.login[0]}}</p>
          </div>
          <div class="form_line">
            <label for="phone" class="form_label">Телефон</label>
            <input type="tel" name="phone" id="phone"
                   :class="{'error' : this.get_result.error.phone[0]}" v-model="popup.registration.form.phone">
            <p class="form_error" v-if="this.get_result.error.phone[0] ">{{this.get_result.error.phone[0]}}</p>
          </div>
          <div class="form_line">
            <label class="form_label form_label-checkbox container">
              <input type="checkbox" name="checkbox"
                     v-model="popup.registration.form.isAccept" class="visibility-hidden">
              <span class="icon">
                <img :src="require(`@/assets/images/checkbox.svg`)" alt="Checkbox"
                     v-show="popup.registration.form.isAccept">
              </span>
              <span>Я согласен с
                <a class="btn btn-link">правилами акции</a>,
                <a class="btn btn-link">пользовательским соглашением</a>
                и с <a class="btn btn-link">положением о конфиденциальности</a></span>
            </label>
            <p class="form_error" v-if="this.get_result.error.rules1">{{this.get_result.error.rules1[0]}}</p>
          </div>
          <button class="btn btn-default btn-action" type="submit">Зарегистрироваться</button>
        </form>
        <p class="box_text text-center">Есть аккаунт?
          <button type="button" class="btn btn-link">Авторизуйся</button>
        </p>
      </div>
      <div class="popup_box box box-bright greeting" v-if="popup.greeting.isOpen">
        <button class="btn btn-close" @click="ClosePopup">
          <img :src="require(`@/assets/images/close.svg`)" alt="Закрыть">
        </button>
        <div class="round-icon">
          <img :src="require(`@/assets/images/check-circle.svg`)" alt="Success">
        </div>
        <h2 class="title box_title text-center">Ваша регистрация прошла успешно!</h2>
        <p class="box_text text-center">Добро пожаловать,
          {{ (this.get_user.isLogin) ? this.get_user.name : popup.greeting.message }}!</p>
        <button class="btn btn-default btn-action" type="button" @click.prevent="ClosePopup">Закрыть окно</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.promotion {
  align-items: center;
  min-height: 100vh;
  position: relative;
  section {
    min-height: 100vh;
    padding: 0 9.72vw;
    width: 100vw;
    @media screen and (max-width: 520px) {
      padding: 0 5.33vw;
    }
  }
  .section {
    &_title {
      font-size: 3.6vw;
      line-height: 1.15;
      margin-bottom: 0.77em;
      @media screen and (max-width: 520px) {
        font-size: 4.67vh;
        margin-bottom: .71em;
      }
    }
    &_subtitle {
      font-size: 2.22vw;
      line-height: 1;
      margin-bottom: .94em;
      font-weight: 700;
      @media screen and (max-width: 520px) {
        font-size: 3.33vh;
        margin-bottom: .5em;
      }
    }
  }
  .prime {
    background: #B1C728;
    padding: 12vh 0 0;
    width: 100%;
    position: relative;
    color: #FFFFFF;
    @media screen and (max-width: 520px) {
      padding: 20.8vw 5.33vw 0;
      flex-direction: column-reverse;
    }
    &_content {
      padding-top: 16.25vh;
      margin: 0 auto;
      position: absolute;
      top: 0;
      left: 50%;
      z-index: 100;
      transform: translateX(-50%);
      @media screen and (max-width: 520px) {
        padding: 5.8vw 0 0;
        position: relative;
        left: auto;
        top: auto;
        transform: none;
      }
      .btn-action {
        font-size: 2.08vw;
        line-height: 0.66;
        padding: 1em 1.33em;
        border-radius: 0.33em;
        @media screen and (max-width: 520px) {
          font-size: 5.33vw;
          padding: 0.8em;
          width: 100%;
          border-radius: .7em;
        }
      }
    }
    &_title {
      max-width: 7.46em;
      font-size: 4.86vw;
      line-height: 1;
      margin-bottom: 4.29vh;
      @media screen and (max-width: 520px) {
        max-width: 90%;
        font-size: 7.5vw;
        margin: 0 auto .36em;
      }
    }
    &_left {
      width: 51.88vw;
      display: flex;
      flex-direction: column;
      @media screen and (max-width: 520px) {
        width: 100%;
        .img-cover {
          width: 64vw;
        }
      }
      .img-cover {
        margin-top: auto;
        width: 100%;
      }
    }
    &_right {
      width: 40vw;
      margin-left: auto;
      position: relative;
      display: flex;
      @media screen and (max-width: 520px) {
        width: 100%;
      }
      .img-cover {
        &:first-child {
          position: absolute;
          top: 0;
          right: 1.11vw;
          width: 10.28vw;
          @media screen and (max-width: 520px) {
            top: -4.26vw;
            right: auto;
            left: -1.6vw;
            width: 20vw;
          }
        }
        &:nth-of-type(2) {
          position: absolute;
          right: 0;
          top: 50%;
          width: 23.6vw;
          transform: translateY(-50%);
        }
        &:nth-of-type(3) {
          position: absolute;
          width: 21.81vw;
          top: 3.75vh;
          right: 10.69vw;
          @media screen and (max-width: 520px) {
            top: 9.3vw;
            right: 0;
            width: 47.47vw;
          }
        }
        &:last-child {
          margin: auto 0 8vh;
          width: 32vw;
          @media screen and (max-width: 520px) {
            width: 64vw;
            margin: 0;
          }
        }
      }
    }
  }
  .prizes {
    position: relative;
    padding-bottom: 18vh;
    @media screen and (max-width: 520px) {
      padding: 0 4.27vw 47.67vh;
    }
    .bg-image {
      position: absolute;
      &:nth-of-type(1) {
        left: 6.67vw;
        top: 11.25vh;
        width: 10.21vw;
        @media screen and (max-width: 520px) {}
      }
      &:nth-of-type(2) {
        right: 0;
        top: 50%;
        width: 7.36vw;
        transform: translateY(-50%);
        @media screen and (max-width: 520px) {}
      }
    }
    &_content {
      padding-top: 12.5vh;
      @media screen and (max-width: 520px) {
        padding-top: 8.33vh;
      }
    }
    &_guaranty {
      margin-bottom: 2.22em;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 520px) {
        margin-bottom: 1.25em;
      }
      .img-cover {
        width: 20.5vw;
        @media screen and (max-width: 520px) {
          height: 14.16vh;
          width: auto;
        }
      }
      .box_text {
        max-width: 22vw;
        margin-left: 9.31vw;
        @media screen and (max-width: 520px) {
          max-width: 41.33vw;
          margin-left: 1.5em;
        }
      }
    }
    &_list {
      padding-top: 8vh;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 2.22em;
      @media screen and (max-width: 520px) {
        grid-template-columns: 1fr;
        grid-gap: 6vh;
      }
      .box {
        padding-top: 0;
        justify-content: flex-end;
        @media screen and (max-width: 520px) {
          justify-content: flex-start;
          flex-direction: row;
          padding: 0 2.5em .75em;
          .box_text {
            width: auto;
            margin-right: auto;
          }
        }
        &_text {
          margin-top: 1.83em;
          font-weight: 400;
          @media screen and (max-width: 520px) {
            padding-top: .75em;
            margin: auto 0;
          }
        }
      }
      .img-cover {
        position: relative;
        margin-top: -8vh;
        height: 35.38vh;
        display: flex;
        @media screen and (max-width: 520px) {
          margin-top: -5vh;
          height: 21vh;
          width: 30.67vw;
          margin-right: 6.67vw;
        }
        img {
          margin: auto 0;
        }
      }
    }
    .btn-action {
      display: block;
      margin: 1.67em auto 0;
      width: calc((100% - 5.55rem) / 3);
      @media screen and (max-width: 520px) {
        width: 100%;
        margin-top: 3.33vh;
      }
    }
  }
}
.popup {
  &_box {
    width: 40.28vw;
    padding: 2.22em 6.94vw;
    @media screen and (max-width: 520px) {
      width: 100vw;
      padding: 4.67vh 5.33vw;
      margin-top: auto;
      border-radius: 2em 2em 0 0;
    }
    &.greeting {
      padding-left: 3vw;
      padding-right: 3vw;
      @media screen and (max-width: 520px) {
        padding: 8vh 5.33vw 6.67vh;
        .box_title {
          font-size: 4.2vh;
          margin-bottom: .83em;
        }
      }
      .box_text {
        width: 80%;
        margin: auto;
        @media screen and (max-width: 520px) {
          margin-bottom: 1.25em;
        }
      }
      .btn-action {
        width: 27.78vw;
        margin: 1.11em auto 0;
        display: block;
        @media screen and (max-width: 520px) {
          width: 100%;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
