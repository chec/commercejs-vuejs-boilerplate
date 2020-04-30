import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Products',
    component: () => import('../views/ProductLanding.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
  },
  {
    path: '/order-confirmation',
    name: 'Order Confirmation',
    component: () => import('../views/Confirmation.vue'),
  },
  {
    path: '*',
    name: 'Page Not Found',
    component: () => import('../views/PageNotFound.vue'),
  },
];
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
