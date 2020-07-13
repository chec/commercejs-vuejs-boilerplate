import Commerce from '@chec/commerce.js';

import Vue from 'vue';
import App from './App.vue';
import Info from './Info.vue';
import router from './router';

Vue.config.productionTip = false;

const commerce = (typeof process.env.VUE_APP_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(process.env.VUE_APP_CHEC_PUBLIC_KEY, true)
  : null;

Vue.mixin({
  beforeCreate() {
    this.$commerce = commerce;
  },
});

new Vue({
  router,
  render: (h) => h((commerce !== null) ? App : Info),
}).$mount('#app');
