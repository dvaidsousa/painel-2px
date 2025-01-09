import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import ResetPassEmail from '../pages/ResetPassEmail.vue';
import ResetPassAfter from '../pages/ResetPassAfter.vue';
import Dashboard from '../pages/Dashboard.vue';
import Ferramentas from '../pages/Ferramentas.vue';
import Etiquetas from '../pages/Etiquetas.vue';
import ControleContas from '../pages/ControleContas.vue';
import Investimentos from '../pages/Investimentos.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/', name: 'Login', component: Login, meta: { requiresAuth: false } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresAuth: false } },
  { path: '/recuperar-senha', name: 'ResetPassEmail', component: ResetPassEmail, meta: { requiresAuth: false } },
  {
    path: '/reset-password/:token',
    name: 'ResetPassAfter',
    component: ResetPassAfter,
    meta: { requiresAuth: false },
    props: true, // Passa o token como prop para o componente
  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/ferramentas', name: 'Ferramentas', component: Ferramentas, meta: { requiresAuth: true } },
  { path: '/etiquetas', name: 'Etiquetas', component: Etiquetas, meta: { requiresAuth: true } },
  { path: '/controle-contas', name: 'ControleContas', component: ControleContas, meta: { requiresAuth: true } },
  { path: '/investimentos', name: 'Investimentos', component: Investimentos, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  // Rotas protegidas
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    console.warn('Acesso negado. Redirecionando para Login.');
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
