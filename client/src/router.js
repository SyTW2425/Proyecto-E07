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
import ContactForm from './components/Contacto.vue';
import GestionPrestaciones from './components/GestionPrestaciones.vue';
import AgendaMedico from './components/AgendaMedico.vue';
import GestionRecetas from './components/GestionRecetas.vue';
import ListaFormContacto from './components/ListaFormContacto.vue';

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
    path: '/recetas',
    name: 'GestionRecetas',
    component: GestionRecetas,
  },
  {
    path: '/lista-contacto',
    name: 'ListaFormContacto',
    component: ListaFormContacto,
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

export default router;
