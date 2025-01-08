import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import PaginaEquipoMedico from './components/PaginaEquipoMedico.vue';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';
import IntranetLogin from './components/IntranetLogin.vue';
import ContactForm from './components/Contacto.vue';
import GestionPrestaciones from './components/GestionPrestaciones.vue';
import AgendaMedico from './components/AgendaMedico.vue';
import ListaFormContacto from './components/ListaFormContacto.vue';
import ReservarCitas from './components/ReservarCitas.vue';
import PaginaError from './components/PaginaError.vue';
import PaginaInicio from './components/Inicio.vue';
import PaginaEspecialidades from './components/PaginaEspecialidades.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';
import GestionDepartamentos from './components/GestionDepartamentos.vue';
import SaludoUsuario from './components/Saludo.vue';
import PruebasCodigo from './components/PruebasCodigo.vue';
import GestionEncuestas from './components/GestionEncuestas.vue';
import '@/assets/styles.css';
import PerfilUsuario from './components/PerfilUsuario.vue';
import GestionAseguradoras from './components/GestionAseguradoras.vue';
import InicioWrapper from './components/InicioWrapper.vue';
import JustificantesPaciente from './components/JustificantesPaciente.vue';
import GestionPacientesAdmin from './components/GestionPacientesAdmin.vue';
import CitasWrapper from './components/CitasWrapper.vue';
import InformesWrapper from './components/InformesWrapper.vue';
import RecetasWrapper from './components/RecetasWrapper.vue';

const routes = [
  { path: '/', component: PaginaInicio },
  { path: '/usuarios', component: CreacionUsuarios, meta: { requiresAuth: true, allowedRoles: ['Gerencia'] }},
  { path: '/departamentos', component: GestionDepartamentos, meta: { requiresAuth: true, allowedRoles: ['Gerencia'] }},
  { path: '/aseguradoras', component: GestionAseguradoras, meta: { requiresAuth: true, allowedRoles: ['Gerencia'] }},
  { path: '/prestaciones', component: GestionPrestaciones, meta: { requiresAuth: true, allowedRoles: ['Gerencia'] }},

  { path: '/saludo', component: SaludoUsuario},
  
  
  { path: '/lista-contacto', component: ListaFormContacto},
  { path: '/reservarcitas', component: ReservarCitas},
  { path: '/encuestas', component: GestionEncuestas},
  { path: '/pruebas', component: PruebasCodigo },

  { path: '/equipo-medico', component: PaginaEquipoMedico},
  { path: '/especialidades', component: PaginaEspecialidades },
  { path: '/contacto', component: ContactForm },

  { path: '/login', component: UserLogin },
  { path: '/intranet', component: IntranetLogin },

  { path: '/register', component: UserRegister },

  { path: '/agenda', component: AgendaMedico, meta: { requiresAuth: true, allowedRoles: ['Médico'] }},
  { path: '/justificantes', component: JustificantesPaciente, meta: { requiresAuth: true, allowedRoles: ['Paciente'] }},

  { path: '/pacientes', component: GestionPacientesAdmin, meta: { requiresAuth: true, allowedRoles: ['Administración'] } },

  { path: '/perfil', component: PerfilUsuario, meta: { requiresAuth: true } },


  { path: '/inicio', component: InicioWrapper, meta: { requiresAuth: true } },

  { path: '/citas', component: CitasWrapper, meta: { requiresAuth: true, allowedRoles: ['Paciente', 'Administración'] } },
  { path: '/:pathMatch(.*)*', component: PaginaError }, // Página de error 404

  
  { path: '/prestaciones', component: GestionPrestaciones },
  { path: '/lista_contacto', component: ListaFormContacto },
  
  { path: '/informes', component: InformesWrapper , meta: { requiresAuth: true, allowedRoles: ['Paciente', 'Médico'] } },
  { path: '/recetas', component: RecetasWrapper, meta: { requiresAuth: true, allowedRoles: ['Paciente', 'Médico'] } },
  

  { path: '/encuestas', component: GestionEncuestas },  
  { path: '/pruebas', component: PruebasCodigo },
  { path: '/iniciopaciente/perfil', component: PerfilUsuario },

  { path: '/:pathMatch(.*)*', component: PaginaError }, 
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia global para verificar autenticación y permisos
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Verificar autenticación
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth();
  }

  // Rutas que requieren autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); // Redirige al login si no está autenticado
  } else if ((to.path === '/login' || to.path === '/intranet') && authStore.isAuthenticated) {  
    // Evitar que usuarios autenticados accedan al login
    next('/inicio');
  } else if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(authStore.user?.tipo)) {
    next('/inicio');
  } else {
    next(); // Permite la navegación
  }
});
export default router;