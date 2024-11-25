import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

const app = createApp(App);

// Configuración de Vuetify
app.use(Vuetify);

// Configuración de Pinia
const pinia = createPinia();
app.use(pinia);

// Registrar el filtro global
app.config.globalProperties.$filters = {
  formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
    const year = date.getFullYear(); // Año
    return `${day}/${month}/${year}`;
  }
};

app.use(router).mount('#app');