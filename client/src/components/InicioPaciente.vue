<template>
  <div class="estilo-pagina">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">PORTAL DEL PACIENTE</h1>

      <div class="user-head">
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #92bdf6;">
          <path d="M6 36C6 31.0347 17.9925 28 24 28C30.0075 28 42 31.0347 42 36V42H6V36Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24 26C29.5228 26 34 21.5228 34 16C34 10.4772 29.5228 6 24 6C18.4772 6 14 10.4772 14 16C14 21.5228 18.4772 26 24 26Z" fill="currentColor"/>
        </svg>
        <span> {{ nombreUsuario }} </span>
      </div>
      <div class="reloj">
        <span>{{ horaActual }}</span>
      </div>
    </header>
    <br>
    <br>  
    <br>
    

    <div class="saludo">
      <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
      <span class="saludo-texto">
        {{ saludo }},
        <br />
        <strong>{{ nombreUsuario }}</strong>
      </span>
      <div class="fraud-container">
        <strong style="font-size: 2rem; margin-top: 2rem;"> Protégete de los fraudes</strong>
      </div>
    </div>
    <br>
    <br>
    <br>
    
    <div class="button-container">
      <a href="#" style="text-decoration: none;">
        <button class="caja-contenido" href="#" >
          <div class="circle">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <br>
          <span style="color: #162d57;">Pedir cita</span>
        </button>
      </a>
  
      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span style="color: #162d57;">Recetas y tratamientos</span>
        </button>
      </a>
      
    </div>
  </div>
  </template>
  
<script>
export default {
  name: "InicioGerencia",
  data() {
    return {
      saludo: '',
      icono: '',
      horaActual: '',
      nombreUsuario: localStorage.getItem('usuario') || 'Usuario', // Leer el nombre del usuario desde localStorage
    };
  },
  methods: {
    actualizarSaludo() {
      const ahora = new Date();
      const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
      const hora = horaCanarias.getHours();

      if (hora >= 6 && hora < 12) {
        this.saludo = "Buenos días";
        this.icono = require('@/assets/icons/buenos_dias.png');
      } else if (hora >= 13 && hora < 20) {
        this.saludo = "Buenas tardes";
        this.icono = require('@/assets/icons/buenas_tardes.png');
      } else {
        this.saludo = "Buenas noches";
        this.icono = require('@/assets/icons/buenas_noches.png');
      }
    },
    actualizarHora() {
      const ahora = new Date();
      const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
      this.horaActual = horaCanarias.toLocaleTimeString('es-ES', { hour12: false });
    },

  },
  mounted() {
    this.actualizarSaludo();
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000); // Actualiza la hora cada segundo
  }
};
  </script>
  <style src="@/assets/styles.css"></style>
  <style scoped>
  
  .header h1 {
    font-size: 24px;
  }
  
  .header span {
    color: var(--primary-color);
  }
  
  .departamento-info p {
    margin: 5px 0;
  }
  
  button {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 0rem); 
  background-color: #e1e1e1;
  
  padding: 1rem;
  text-align: left;
  display: flex;

  align-items: left;
  justify-content: left;

  gap: 10px;
  border-radius: 15px; 
}


.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
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
.vertical-line {
  width: 4px;
  height: 70px;
  background-color: #92bdf6; 
}

.icono-blanco {
  color: #ffffff; 
}

.saludo {
  display: flex;
  align-items: center;
}

.saludo-icono {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}

.saludo-texto {
  font-size: 45px; /* Ajusta el tamaño de la fuente */
  color: var(--primary-color);
  line-height: 1.2; /* Controla la separación entre líneas  */
}


.reloj {
  font-size: 24px;
  font-weight: bold;
}

/* Estilo del círculo */
.circle {
  width: 70px; /* Tamaño del círculo */
  height: 70px;
  border-radius: 50%; /* Hace que sea un círculo */
  background-color: var(--primary-color); /* Usa el color definido */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}




.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
}

.caja-contenido {
  background-color: var(--color-azul2);
  border-radius: 12px; /* Bordes redondeados */
  width: 10rem; /* Ajusta el ancho */
  height: 10rem; /* Ajusta la altura */
  display: flex;
  flex-direction: column;
  align-items: center;
}



.button p {
  font-size: 18px;
  font-weight: bold;
  color: #162d57; /* Azul oscuro */
  margin: 0;
}

.small-text {
  font-size: 14px;
  margin: 0;
  color: var(--color-azul2);
}

.user-head {
  position: relative;
  align-items: center;
  display: flex;
  margin-left: 2rem;
  justify-content: center;
}

.fraud-container {
  background-color: #e7c2d4;
  border-radius: 2.5rem; /* Bordes redondeados */
  width: 52rem; /* Ajusta el ancho */
  height: 15rem; /* Ajusta la altura */
  position: relative;
  margin: 0 auto;
  margin-right: 0;
  display: flex;
  justify-content: center;
  line-height: 1.2;
}

</style>
  