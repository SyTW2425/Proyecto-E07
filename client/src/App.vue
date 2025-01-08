<template>
  <div id="app" data-app>
    <!-- Mostrar HeaderWeb o Header según la ruta -->
    <component :is="isSpecialRoute ? 'HeaderWeb' : 'Header'" />

    <!-- Contenedor para mostrar las rutas -->
    <router-view />
    <div id="footer">
    <Footer />
  </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import HeaderWeb from '@/components/HeaderWeb.vue';
import "@/assets/styles.css";
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    HeaderWeb,
    Footer,
  },
  setup() {
    const route = useRoute();
    const isSpecialRoute = computed(() => route.path === '/' || route.path === '/especialidades' || route.path === '/error' || route.path === '/equipo-medico'  || route.path === '/contacto'  || route.path === '/login'   || route.path === '/intranet'  || route.path === '/register');
    return { isSpecialRoute };
  }
});
</script>
