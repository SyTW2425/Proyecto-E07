<template>
    <header class="header">
      <router-link to="/inicio">
        <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      </router-link>
      <div class="vertical-line"></div>
      
      
      <div v-if="tipoUsuario === 'Paciente'">
        <h1 class="left-align small-text">PORTAL DEL PACIENTE</h1>
      </div>
      <div v-else>
        <h1 class="left-align small-text">INTRANET</h1>
      </div>

      <div class="header-right">
        <div style="margin-right: 0.5rem; font-size: 1.4rem; color: var(--primary-color); font-weight: 500;">
          {{ this.usuario.nombre }} {{ this.usuario.apellidos }}
        </div>

      <div class="circle-usuario" @click="toggleMenu" :class="{ 'active': mostrarMenu }">
        <svg xmlns="http://www.w3.org/2000/svg" height="47px" viewBox="0 -960 960 960" width="47px" fill="white" :class="{ 'active': mostrarMenu }">
          <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
        </svg>
      </div>
        <div :class="{ 'dropdown-menu': true, active: mostrarMenu }">
          <ul>
              <li v-if="tipoUsuario === 'Paciente' || tipoUsuario === 'Administración' || tipoUsuario === 'Médico'" @click="irAgendaCitas">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
                </svg>
                <span v-if="tipoUsuario === 'Paciente' || tipoUsuario === 'Administración'">Citas</span>
                <span v-else-if="tipoUsuario === 'Médico'">Agenda</span>
              </li>
            <div v-if="tipoUsuario === 'Administración'">
              <li @click="irPacientes">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
                </svg>
                Pacientes
              </li> 

              <li @click="irRespuestasContacto">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
                </svg>
                Solicitudes contacto
              </li>
            </div>

            <div v-if="tipoUsuario === 'Gerencia'">
              <li @click="irUsuarios">
                <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              color="var(--primary-color)"
            >
            <path d="M18 16.5C18 18.9862 15.9862 21 13.5 21C11.0138 21 9 18.9862 9 16.5C9 14.0138 11.0138 12 13.5 12C15.9862 12 18 14.0138 18 16.5Z" fill="currentColor"/>
            <path d="M4 28.3333C4 24.7867 10.3294 23 13.5 23C16.6706 23 23 24.7867 23 28.3333V36H4V28.3333Z" fill="currentColor"/>
            <path d="M39 16.5C39 18.9862 36.9863 21 34.5 21C32.0138 21 30 18.9862 30 16.5C30 14.0138 32.0138 12 34.5 12C36.9863 12 39 14.0138 39 16.5Z" fill="currentColor"/>
            <path d="M27 15C27 16.6575 25.6575 18 24 18C22.3425 18 21 16.6575 21 15C21 13.3425 22.3425 12 24 12C25.6575 12 27 13.3425 27 15Z" fill="currentColor"/>
            <path d="M25 28.3333C25 24.7867 31.3294 23 34.5 23C37.6706 23 44 24.7867 44 28.3333V36H25V28.3333Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7508 22.185C28.4839 22.2831 28.2206 22.3873 27.9625 22.4975C26.7914 22.998 25.6088 23.6741 24.69 24.5785C24.444 24.8208 24.2105 25.0864 24 25.375C23.7895 25.0864 23.556 24.8208 23.3099 24.5785C22.3912 23.6741 21.2085 22.998 20.0374 22.4975C19.7794 22.3873 19.5161 22.2831 19.2491 22.185C20.7717 21.3961 22.7298 21 24 21C25.2701 21 27.2282 21.3961 28.7508 22.185Z" fill="currentColor"/>

            </svg>
                Usuarios
              </li> 

              <li @click="irDepartamentos">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M480-340q33 0 56.5-23.5T560-420q0-33-23.5-56.5T480-500q-33 0-56.5 23.5T400-420q0 33 23.5 56.5T480-340ZM160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/>
                </svg>
                Departamentos
              </li>

              <li @click="irAseguradoras">
                <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              color="var(--primary-color)"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
          </svg>
                Aseguradoras
              </li>

              <li @click="irPrestaciones">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M480-254 330-104q-23 23-56 23t-56-23L104-218q-23-23-23-56t23-56l150-150-150-150q-23-23-23-56t23-56l114-114q23-23 56-23t56 23l150 150 150-150q23-23 56-23t56 23l114 114q23 23 23 56t-23 56L706-480l150 150q23 23 23 56t-23 56L742-104q-23 23-56 23t-56-23L480-254Zm0-266q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm-170-16 114-114-150-150-114 114 150 150Zm90 96q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm80 80q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm80-80q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520q-17 0-28.5 11.5T520-480q0 17 11.5 28.5T560-440Zm-24 130 150 150 114-114-150-150-114 114ZM339-621Zm282 282Z"/>
                </svg>
                Prestaciones
              </li>
            </div>

            <div v-if="tipoUsuario === 'Paciente' || tipoUsuario === 'Médico'">
              
              <li @click="irRecetas">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M280-280h84l240-238-86-86-238 238v86Zm352-266 42-44q6-6 6-14t-6-14l-56-56q-6-6-14-6t-14 6l-44 42 86 86ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-590q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/>
                </svg>
                Recetas
              </li>

              <li @click="irInformes">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                </svg>
                Informes
              </li>
              

            </div>  

            <div v-if="tipoUsuario === 'Paciente'">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M200-200h560v-367L567-760H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400l240 240v400q0 33-23.5 56.5T760-120H200Zm80-160h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h280v-80H280v80Zm-80 400v-560 560Z"/>
                </svg>
                Justificantes
              </li>
              
            </div>
              

              <li @click="irConfiguracion">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M160-40v-80h640v80H160Zm0-800v-80h640v80H160Zm320 400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm70-80q45-56 109-88t141-32q77 0 141 32t109 88h70v-480H160v480h70Zm118 0h264q-29-20-62.5-30T480-280q-36 0-69.5 10T348-240Zm132-280q-17 0-28.5-11.5T440-560q0-17 11.5-28.5T480-600q17 0 28.5 11.5T520-560q0 17-11.5 28.5T480-520Zm0 40Z"/>
                </svg>
                Mis datos
              </li>
              <li @click="cerrarSesion" style="background-color: var(--color-azul); color: var(--primary-color); margin-bottom: 0; padding-bottom: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                </svg>
                
                Cerrar sesión
              </li>
            </ul>
          </div> 
      </div>

    </header>
</template>


<script>
import { useAuthStore } from '../../store/auth';


export default {
  name: 'AppHeader',
  data() {
    return {
      mostrarMenu: false,
      usuario: '',
      tipoUsuario: '',
    };
  },
  methods: {
    async datosUsuario() {
      const authStore = useAuthStore();
      await authStore.checkAuth();
      this.usuario = authStore.getUser ? authStore.getUser : 'Usuario';
      this.tipoUsuario = authStore.getUser ? authStore.getUser.tipo : 'Usuario';
    },
    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu;
      console.log('mostrarMenu', this.mostrarMenu);
    },
    irConfiguracion() {
      this.$router.push('/perfil');
    },
    async cerrarSesion() {
      if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        console.log('cerrarSesion');
        const authStore = useAuthStore();
        await authStore.logout();
      }
    },
    irAgendaCitas() {
      if (this.tipoUsuario === 'Paciente' || this.tipoUsuario === 'Administración') {
        this.$router.push('/citas');
      } else if (this.tipoUsuario === 'Médico') {
        this.$router.push('/agenda');
      }
    },
    irRecetas() {
      this.$router.push('/recetas');
    },
    irPacientes() {
      this.$router.push('/pacientes');
    },
    irRespuestasContacto() {
      this.$router.push('/lista-contacto');
    },
    irJustificantes() {
      this.$router.push('/justificantes');
    },
    irInformes() {
      this.$router.push('/informes');
    },
    irUsuarios() {
      this.$router.push('/usuarios');
    },
    irDepartamentos() {
      this.$router.push('/departamentos');
    },
    irAseguradoras() {
      this.$router.push('/aseguradoras');
    },
    irPrestaciones() {
      this.$router.push('/prestaciones');
    },
  },
  async mounted() {   
    await this.datosUsuario();
  },

};
</script>

<style>

  .header {
    display: flex;
    justify-content: space-between;
    max-width: calc(100% - 4rem); /* O elimina esta línea si no es necesaria */
    margin-left: 2rem;
    margin-right: 2rem;
    box-sizing: border-box; /* Asegura que los márgenes se respeten correctamente */
  }




  .header span {
    color: black;
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
    display: none; /* Por defecto, oculto */

    top: 100%; /* Esto lo coloca justo debajo del círculo */
    left: 0; /* Esto asegura que esté alineado con el borde izquierdo del círculo */

  }

  .dropdown-menu.active {
    display: block; /* Mostrar cuando esté activo */
  }


  .dropdown-menu ul {
    list-style: none; 
    padding: 0;
    margin: 0;
  }

  .dropdown-menu li {
    padding: 10px 20px;
    cursor: pointer; 
    display: flex;
    align-items: center;
    color: black;
  }

  .dropdown-menu li svg {
    margin-right: 10px;
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