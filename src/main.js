import './assets/style/global.scss';
import Vue from 'vue';
import App from './App.vue';
import vuetify from "@/assets/plugins/vuetify.js";
import router from "@/router.js";
import store from "@/store.js";

import "./mixins.js";
import "./filters.js";

Vue.config.productionTip = false;

import MainPage from "@/layouts/MainPage.vue";

Vue.component('main-page', MainPage);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
