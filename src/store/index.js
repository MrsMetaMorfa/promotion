import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

const FormUrl = '/registerByEmail'
const AuthUrl = '/authenticateByEmail'
const ProfileUrl = '/getProfile'
const FormAPI = axios.create({
  baseURL: 'https://promo-test.emlsdr.ru/backend/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default new Vuex.Store({
  state: {
    user: {
      isLogin: true
    },
    reg_form: {
      name: String,
      login: String,
      phone: String,
      rules1: Boolean
    },
    error_list: {
      login: Array,
      name: Array,
      phone: Array,
      rules1: Array
    },
    result: {
      result: null,
      error: {
        login: Array,
        name: Array,
        phone: Array,
        rules1: Array
      }
    },
    errors: []
  },
  getters: {
    get_result: (state) => {
      return state.result
    },
    get_user: (state) => {
      return state.user
    }
  },
  mutations: {
    UPDATE_RESULT: (state, result) => {
      console.log(result)
      if (result.result) {
        state.result.result = result.result
        state.result.error = state.error_list
        state.user.login = state.reg_form.login
        state.user.name = state.reg_form.name
        state.user.password = result.data.password
        state.dispatch('AuthUser')
      } else {
        state.user.name = state.reg_form.name
        state.result = result
      }
    },
    UPDATE_RESULT_ERROR_LOGIN: (state, value) => {
      state.result.error.login = value
    },
    UPDATE_RESULT_ERROR_NAME: (state, value) => {
      state.result.error.name = value
    },
    UPDATE_RESULT_ERROR_PHONE: (state, value) => {
      state.result.error.phone = value
    },
    UPDATE_RESULT_ERROR_RULES: (state, value) => {
      state.result.error.rules1 = value
    },
    UPDATE_RESULT_SUCCESS: (state, value) => {
      state.result.result = value
    },
    SET_USER: (state, value) => {
      console.log(value)
      state.user.auth_key = value.auth_key
      state.auth_key = value.auth_key
      state.dispatch('GetUser')
    },
    UPDATE_USER: (state, value) => {
      state.user = value
    }
  },
  actions: {
    async GetUser(state) {
      try {
        let result = {}
        await FormAPI.get(ProfileUrl)
            .then ((response) => {result = response.data})
            .catch(error => console.log(error));
        state.commit("UPDATE_USER", result.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async AuthUser(state) {
      try {
        let result = {}
        await FormAPI.post(AuthUrl, state.user)
            .then ((response) => {result = response.data})
            .catch(error => console.log(error));
        state.commit("SET_USER", result.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async PostForm(state) {
      try {
        let result = {}
        await FormAPI.post(FormUrl, state.reg_form)
            .then ((response) => {
              result = response.data
            })
            .catch(error => console.log(error))
        state.commit('UPDATE_RESULT', result)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
