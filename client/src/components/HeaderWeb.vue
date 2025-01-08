<template>
  <header class="header" style="margin-top: 20px;">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
    </router-link>
    
    <div class="header-right">
      <nav>
        <ul class="menu">
          <li :class="{ 'selected': currentRoute === 'inicio' }"><a @click.prevent="irInicio">Inicio</a></li>
          <li :class="{ 'selected': currentRoute === 'especialidades' }"><a @click.prevent="irEspecialidades">Especialidades</a></li>
          <li :class="{ 'selected': currentRoute === 'equipoMedico' }"><a @click.prevent="irEquipoMedico">Equipo Médico</a></li>
          <li :class="{ 'selected': currentRoute === 'contacto' }"><a @click.prevent="irContacto">Contacto</a></li>
        </ul>
      </nav>
    </div>
    
  </header>
</template>

<script>
export default {
  name: 'HeaderWeb',
  data() {
    return {
      currentRoute: ''
    };
  },
  methods: {
    irInicio() {
      this.currentRoute = 'inicio';
      this.$router.push('/');
    },
    irEspecialidades() {
      this.currentRoute = 'especialidades';
      this.$router.push('/especialidades');
    },
    irEquipoMedico() {
      this.currentRoute = 'equipoMedico';
      this.$router.push('/equipo-medico');
    },
    irContacto() {
      this.currentRoute = 'contacto';
      this.$router.push('/contacto');
    }
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  max-width: calc(100% - 4rem);
  margin-left: 2rem;
  margin-right: 2rem;
  box-sizing: border-box;
}


.header img.logo {
  width: 200px;
  height: auto; 
  margin: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}


.header-right {
  font-weight: bold;
  margin-left: auto;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 2rem ;
}

.menu {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.menu li {
  display: inline;
  color: var(--primary-color);
  font-weight: 300; /* Grosor de los elementos del menú */

}

.menu li.selected {
  font-weight: 500; /* Grosor de la opción seleccionada */
}

.menu li a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

</style>
