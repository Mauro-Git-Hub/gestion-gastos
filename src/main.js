import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import router from './router/index.js';
import { auth } from './firebase.js';

Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');
