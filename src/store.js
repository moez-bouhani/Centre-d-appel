import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
import axios from "axios";
import { apiDomain } from "./config.js";
export default new Vuex.Store({
  strict: true,
  state: {
    currentIndex:'',
    sidebarShow: "responsive",
    sidebarMinimize: false,
    loggedIn: false,
    user: null,
    token: null,
    active: "",
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
      state.sidebarShow = sidebarOpened ? false : "responsive";
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
      state.sidebarShow = sidebarClosed ? true : "responsive";
    },
    set(state, [variable, value]) {
      state[variable] = value;
    },
    //fetch usres
    FETCH_USERS(state, users) {
      return (state.users = users);
    },

    SET_user(state, payload) {
      state.user = payload;
    },
    SET_currentIndex(state, payload) {
      state.currentIndex = payload;
    },

    updatecurrentIndex(state, currentIndex) {
      state.currentIndex = currentIndex
  },

    SET_token(state, payload) {
      state.token = payload;
    },
    SET_loggedIn(state, payload) {
      state.loggedIn = payload;
    },
  },
  actions: {
    performLoginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${apiDomain}/api/auth/login`, {
            telephone: payload.telephone,
            password: payload.password,
          })
          .then((res) => {
            commit("SET_token", res.data.access_token);
            commit("SET_user", res.data.user);

            commit("SET_loggedIn", true);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    performRegisterAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${apiDomain}/api/auth/register`, {
            nom: payload.nom,
            prenom: payload.prenom,

            email: payload.email,
            telephone: payload.telephone,
            password: payload.password,
          })
          .then((res) => {
            commit("SET_token", res.data.access_token);
            commit("SET_user", res.data.user);
            commit("SET_loggedIn", true);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    performLogoutAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${apiDomain}/api/auth/logout`, {
            token: state.token,
          })

          .then((res) => {
            commit("SET_token", null);

            commit("SET_loggedIn", false);
            commit("SET_user", null);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    users: (state) => {
      return state.users;
    },

    user: (state) => {
      return state.user;
    },
    currentIndex: (state) => {
      return state.currentIndex;
    },
    get_loggedIn(state) {
      return state.loggedIn;
    },
  },
});
