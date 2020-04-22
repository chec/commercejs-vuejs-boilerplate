import Commerce from '@chec/commerce.js';

import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import 'bootstrap';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
const commerce = new Commerce(process.env.VUE_APP_CHEC_PUBLIC_KEY, true);

Vue.mixin({
  beforeCreate() {
    this.$commerce = commerce;
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
