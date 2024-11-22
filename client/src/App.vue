<template>
  <div id="app" data-app>
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Funcionalidades:</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/especialidades">Especialidades</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/equipo-medico">Equipo Medico</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/usuarios">Usuarios</router-link>
          </li>
          
          <li class="nav-item">
            <router-link class="nav-link" to="/departamentos">Departamentos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/agenda-medico">Agenda Médico</router-link> <!-- Enlace para la agenda -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link> <!-- Enlace para la agenda -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/aseguradoras">Aseguradoras</router-link> <!-- Enlace para la agenda -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/saludo">Saludo</router-link> <!-- Enlace para la agenda -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/prestaciones">Prestaciones</router-link> <!-- Enlace para la agenda -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/recetas">Recetas</router-link> <!-- Enlace para la agenda -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lista_contacto">Lista contacto</router-link> <!-- Enlace para la agenda -->
            <router-link class="nav-link" to="/reservarcitas">Reservar Citas</router-link> <!-- Enlace para la agenda -->
          </li>
        </ul>
      </div>
    </nav>

    <!-- Contenedor para mostrar las rutas -->
    <router-view />
  </div>
</template>

<script>
import "@/assets/styles.css";
export default {
  name: 'App',
};
</script>
