<template>
  <div class="estilo-pagina">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">PORTAL DEL PACIENTE</h1>

      <div class="header-right">
        <div style="margin-right: 0.5rem; font-size: 1.4rem; color: var(--primary-color); font-weight: 500;">
          {{ this.usuario.nombre }} {{ this.usuario.apellidos }}
        </div>
      <div class="circle-usuario" @click="toggleMenu" :class="{ 'active': mostrarMenu }">
        <svg xmlns="http://www.w3.org/2000/svg" height="47px" viewBox="0 -960 960 960" width="47px" fill="white" :class="{ 'active': mostrarMenu }">
          <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
        </svg>
      </div>
      <div v-if="mostrarMenu" class="dropdown-menu">
            <ul>
              <li @click="irConfiguracion">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M160-40v-80h640v80H160Zm0-800v-80h640v80H160Zm320 400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm70-80q45-56 109-88t141-32q77 0 141 32t109 88h70v-480H160v480h70Zm118 0h264q-29-20-62.5-30T480-280q-36 0-69.5 10T348-240Zm132-280q-17 0-28.5-11.5T440-560q0-17 11.5-28.5T480-600q17 0 28.5 11.5T520-560q0 17-11.5 28.5T480-520Zm0 40Z"/>
                </svg>
                Mis datos</li>
              <li @click="cerrarSesion">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                </svg>
                
                Cerrar sesión</li>
            </ul>
          </div>
      </div>

    </header>
  </div>
</template>


<script>
import { useAuthStore } from '../../store/auth';


export default {
  name: 'AppHeader',
  data() {
    return {
      mostrarMenu: false,
      usuario: '',
    };
  },
  methods: {
    async datosUsuario() {
      const authStore = useAuthStore();
      await authStore.checkAuth();
      this.usuario = authStore.getUser ? authStore.getUser : 'Usuario';
    },
    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu;
    },
    irConfiguracion() {
      console.log("Ir a configuración");
    },
    cerrarSesion() {
      console.log("Cerrar sesión");
    },
  },
  async mounted() {   
    await this.datosUsuario();
  },

};
</script>

<style>
  .contenedor-principal {
    display: flex;
    justify-content: space-between;
  }

  .estilo-pagina {  
    margin-left: 2rem; 
    margin-right: 2rem;
  }


  .header span {
    color: var(--primary-color);
  }

  .header img.logo {
    width: 200px;
    height: auto; 
  }

  .header h1.left-align {
    text-align: left;
    margin-left: 10px; 
  }

  .header h1.small-text {
    font-size: 20px; 
    color: var(--primary-color);
    font-weight: 300;
  }

  .header-right {
    font-weight: bold;
    margin-left: auto;
    display: flex;
    align-items: center;

    position: relative;
  }

  .vertical-line {
    width: 4px;
    height: 70px;
    background-color: #92bdf6; 
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: block;

    top: 100%; /* Esto lo coloca justo debajo del círculo */
    left: 0; /* Esto asegura que esté alineado con el borde izquierdo del círculo */

  }





  .dropdown-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .dropdown-menu li {
    padding: 10px 20px;
    cursor: pointer;
  }

  .dropdown-menu li:hover {
    background-color: #f0f0f0;
  }

  .circle-usuario {
    width: 4rem; /* Tamaño del círculo */
    height: 4rem;
    border-radius: 50%;
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    margin: 0.5rem;
    margin-right: 20px;
    position: relative; /* Agregado */
    cursor: pointer;
  }

  /* Estilo cuando el menú está activo */
  .circle-usuario.active {
    background-color: var(--color-azul); /* Cambiar el color cuando está activo */
    transform: scale(1.1); /* Aumentar el tamaño para resaltar */
    transition: all 0.3s ease; /* Añadir transición suave */
  }

  .circle-usuario svg.active {
    fill: var(--primary-color); /* Cambia el color del icono cuando está activo */
  }


</style>