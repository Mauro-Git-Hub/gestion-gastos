import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/components/Auth.vue';
import Dashboard from '@/components/Dashboard.vue';
import Carga from '@/components/Carga.vue';
import ListaCategoria from '@/components/ListaCategoria.vue';
import ListaFecha from '@/components/ListaFecha.vue';
import { auth } from '@/firebase.js';

Vue.use(Router);

const routes = [
  { path: '/', component: Auth },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/carga', component: Carga, meta: { requiresAuth: true } },
  {
    path: '/categoria',
    component: ListaCategoria,
    meta: { requiresAuth: true },
  },
  { path: '/fecha', component: ListaFecha, meta: { requiresAuth: true } },
  { path: '*', component: NotFound }, // Ruta catch-all para manejar rutas no válidas
];

const router = new Router({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    next('/');
  } else {
    next();
  }
});

export default router;
