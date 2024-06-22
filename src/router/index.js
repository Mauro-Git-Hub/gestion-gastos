import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/components/Auth.vue';
import Dashboard from '@/components/Dashboard.vue';
import { auth } from '@/firebase.js';

Vue.use(Router);

const rutas = [
  { path: '/', component: Auth },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = new Router({
  routes: rutas,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const usuario = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !usuario) {
    next('/');
  } else {
    next();
  }
});

export default router;
