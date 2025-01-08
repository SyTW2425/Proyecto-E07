<template>
    <footer class="footer" role="contentinfo">
      <div class="footer-left">
        <router-link to="/login" class="footer-item">Portal del paciente</router-link>
        <router-link to="/intranet" class="footer-item">Intranet</router-link>
        <router-link to="/contacto" class="footer-item">Contacto</router-link>
      </div>
      <div class="footer-mid">
        <router-link to="/" @click.native="scrollToTop" tabindex="0">
          <img :src="require('@/assets/icons/logo-inv.png')" alt="Logo" class="logo">
        </router-link>
      </div>
      <div class="footer-right">
        <p tabindex="0">Somos un centro hospitalario comprometido en ofrecerte atención <br>sanitaria de primer nivel, con dedicación y calidad humana.</p>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'FooterWeb',
  data() {
    return {
      search: ''
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push('/login'); 
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
};
</script>

<style>
.footer {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten en varias filas */
  justify-content: space-between; /* Alinea los elementos a los extremos */
  align-items: center; /* Alinea los elementos verticalmente */
  padding: 1.1rem;
  background-color: #17195e; /* Color de fondo del pie de página */
}

.footer-left {
  display: flex; /* Alinea el texto a la izquierda */
  gap: 5rem;
  padding-left: 1rem;
}

.footer-item {
  text-align: left; /* Alinea el texto a la izquierda */
  color: white; /* Color del texto */
  text-decoration: none;
}

.footer-mid {
  text-align: center; /* Alinea el logo al centro */
}

.footer-right {
  text-align: left; /* Alinea el texto a la derecha */
  color: white; /* Color del texto */
  padding-right: 1rem;
  padding-top: 0.5rem;
  display: flex;
  align-items: center; /* Alinea el texto verticalmente al centro */
}

.footer .logo {
  width: 170px; /* Ajusta el tamaño del logo según sea necesario */
  height: auto; /* Mantiene la proporción del logo */
}
</style>