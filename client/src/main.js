import '@mdi/font/css/materialdesignicons.css'; // Importa los iconos de MDI
import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Importa el router que configuraste
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { createPinia, PiniaVuePlugin } from 'pinia';

Vue.config.productionTip = false;

Vue.use(Vuetify);
//Vue.use(PiniaVuePlugin);

//const pinia = createPinia();

// Registrar el filtro global
Vue.filter('formatDate', function (value) {
  if (!value) return '';
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
  const year = date.getFullYear(); // Año
  return `${day}/${month}/${year}`;
});

// Registrar el filtro global
Vue.filter('formatDate', function (value) {
  if (!value) return '';
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
  const year = date.getFullYear(); // Año
  return `${day}/${month}/${year}`;
});

new Vue({
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi', // Usa Material Design Icons
    },
  }),
  router,
  //pinia,
  render: h => h(App),
}).$mount('#app');