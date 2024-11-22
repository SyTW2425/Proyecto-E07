// src/router/routes.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import PaginaInicio from './components/Inicio.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';
import GestionDepartamentos from './components/GestionDepartamentos.vue'; 
import PaginaError from './components/PaginaError.vue';
import PaginaEnDesarrollo from './components/PaginaEnDesarrollo.vue';
import SaludoUsuario from './components/Saludo.vue';
import PaginaEspecialidades from './components/PaginaEspecialidades.vue';
import PaginaEquipoMedico from './components/PaginaEquipoMedico.vue';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';
import IntranetLogin from './components/IntranetLogin.vue';
import ContactForm from './components/Contacto.vue';
import GestionPrestaciones from './components/GestionPrestaciones.vue';
import AgendaMedico from './components/AgendaMedico.vue';
import ReservarCitas from './components/ReservarCitas.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: PaginaInicio,
  },
  {
    path: '/especialidades',
    name: 'PaginaEspecialidades',
    component: PaginaEspecialidades,
  },
  {
    path: '/equipo-medico',
    name: 'PaginaEquipoMedico',
    component: PaginaEquipoMedico,
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: CreacionUsuarios,
  },
  {
    path: '/agenda-medico', 
    name: 'AgendaMedico',
    component: AgendaMedico,
  },
  {
    path: '/departamentos',
    name: 'GestionDepartamentos',
    component: GestionDepartamentos,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: ContactForm,
  },
  {
    path: '/saludo',
    name: 'SaludoUsuario',
    component: SaludoUsuario,
  },
  {
    path: '/aseguradoras',
    name: 'PaginaEnDesarrollo',
    component: PaginaEnDesarrollo,
  },
  {
    path: '/prestaciones',
    name: 'GestionPrestaciones',
    component: GestionPrestaciones,
  },
  {
    path: '/intranet',
    name: 'Intranet',
    component: IntranetLogin,
  },
  { 
    path: '/reservarcitas',
    name: 'ReservarCitas',
    component: ReservarCitas,
  },
  {
    path: '*', // Ruta comodín para capturar rutas no existentes
    name: 'PaginaError',
    component: PaginaError,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
