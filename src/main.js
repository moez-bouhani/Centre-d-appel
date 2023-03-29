import "core-js/stable";
import 'regenerator-runtime/runtime'
import Vue from "vue";
import axios from "axios";
//get noty
import "vuejs-noty/dist/vuejs-noty.css";
import VueNoty from "vuejs-noty";
Vue.use(VueNoty);
//import VueAuth from '@websanova/vue-auth'
import VueAxios from "vue-axios";
//import requiresAuth from './requiresAuth'
import VueRouter from "vue-router";
import VuePassword from "vue-password";

Vue.component(VuePassword);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Set Vue authentication
Vue.use(VueAxios, axios);
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`;
//Vue.use(VueAuth, requiresAuth)
// Set Vue router
Vue.router = router;
Vue.use(VueRouter);

import VuexFlash from "vuex-flash";

Vue.use(VuexFlash);

Vue.component("pagination", require("laravel-vue-pagination"));

Vue.config.productionTip = false;
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import store from "./store";

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.prototype.$log = console.log.bind(console);

new Vue({
  el: "#app",
  router,
  store,
  icons,
  template: "<App/>",
  components: {
    App,
  },
});
