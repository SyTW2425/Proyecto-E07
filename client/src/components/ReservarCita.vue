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
        <h1><router-link to="/iniciopaciente/perfil" class="usuario-boton">{{ nombreUsuario }}</router-link></h1>
      </div>
      <div class="reloj">
        <span>{{ horaActual }}</span>
      </div>
    </header>
    <br>
    <button class="boton" @click="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
      </svg>
      Volver
    </button>
    <br>  
    <br>


    <div v-if="!esPaciente" class="error-cuadro">
    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="var(--background-color)">
      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z"/>
    </svg>
    <strong>Error: </strong>El usuario no es un Paciente
  </div>

    <div class="contenedor-principal">
      <!-- Columna izquierda -->
      
      <div class="columna-formulario">
        <div class="alinear-elementos">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
              <path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z"/>
            </svg>
          </div>
          <h2 style="color: var(--primary-color);">Reservar cita</h2>
        </div>
        <br>

         <!-- Mostrar el nombre del paciente seleccionado -->
         <label>Paciente: <span>{{ paciente.nombre }} {{ paciente.apellidos }}</span></label>
         <br>
         <br>

         
  
        <!-- Selector de Especialidad -->
        <label>Especialidad:
          <select v-model="selectedEspecialidad" @change="cargarMedicos">
            <option value="">Seleccione una especialidad</option>
            <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad._id">
              {{ especialidad.nombre }}
            </option>
          </select>
        </label>
        <br>
        <br>
  
        <!-- Selector de Médico -->
        <label>Médico:
          <select v-model="selectedMedico" @change="cargarCitasDisponibles">
            <option value="">Cualquiera</option>
            <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
              {{ medico.nombre }} {{ medico.apellidos }}
            </option>
          </select>
        </label>
        <br>
        <br>
    
        <!-- Mostrar las citas disponibles -->
        <div v-if="esPaciente && citasDisponibles.length > 0">
          <div v-for="(cita, index) in citasDisponibles" :key="index">
            <p v-if="cita.medicoId">Fecha: {{ cita.fecha | formatDate }}. Hora: {{ cita.hora }}. Especialista: {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}</p>
            <p v-else>Fecha: {{ cita.fecha | formatDate }}. Hora: {{ cita.hora }}. Especialista: No asignado</p>
            <div>
              <!-- Mostrar el botón de "Reservar cita" solo si hay un paciente y una especialidad seleccionados -->
              <button v-if="selectedPaciente && selectedEspecialidad"
                @click="reservarCita(cita._id, selectedPaciente)">
                Reservar cita
              </button>
            </div>
          </div>
        </div>
  
        <div v-else>
          <p>No hay citas disponibles para la selección.</p>
        </div>
      </div>
  
      <!-- Columna derecha - Listado de citas médicas con paciente asignado -->
      <div class="columna-citas"> 
      <div class="alinear-elementos">
       
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
            </svg>
          </div>
          <h2 style="color: var(--primary-color);">Mis citas</h2>
        </div>


        <br>
        <br>
        <div v-if="citasConsulta.length > 0">
          <div v-for="(cita, index) in citasConsulta" :key="index" class="cita-item">
            <p v-if="cita.medicoId">Médico: {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}</p>
            <p v-else>Médico: No asignado</p>
            <p>Especialidad: {{ cita.especialidadId ? cita.especialidadId.nombre : 'No asignada' }}</p>
            <p>Prestación: {{ cita.prestacionId ? cita.prestacionId.nombre : 'No asignada' }}</p>
            <p>Fecha: {{ cita.fecha | formatDate }} - Hora: {{ cita.hora }}</p>
            <p>Duración: {{ cita.duracion }} minutos</p>
            <p v-if="cita.pacienteId">Paciente: {{ cita.pacienteId.nombre }} {{ cita.pacienteId.apellidos }}</p>
            <p v-else>Paciente: No asignado</p>
            <!-- Botón para cancelar cita -->
            <button @click="cancelarCita(cita._id)">Cancelar Cita</button>
          </div>
        </div>
        <div v-else>
          <p>No hay citas reservadas.</p>
        </div>
      </div>
    </div>
    </div>
  </template>
    
    
  
  <script>
  import apiClient from '@/apiClient';
  import { useAuthStore } from '../../store/auth';

  export default {
    name: "ReservarCitas",
    data() {
      return {
        horaActual: '',
        especialidades: [], // Lista de especialidades
        medicos: [], // Lista de médicos filtrados por especialidad
        citasDisponibles: [], // Citas filtradas por paciente, especialidad y médico
        paciente: '',
        selectedEspecialidad: '', // Especialidad seleccionada
        selectedMedico: '', // Médico seleccionado
        citasConsulta: [], // Citas de tipo consulta donde pacienteId no es null
      };
    },
    computed: {
      nombreUsuario() {
        const authStore = useAuthStore();
        return authStore.getUser ? `${authStore.getUser.nombre} ${authStore.getUser.apellidos}` : 'Usuario';
      } ,
      esPaciente() {
        return this.paciente.tipo === 'Paciente';
      },
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      datosUsuario() {
        const authStore = useAuthStore();
        this.paciente = authStore.getUser ? authStore.getUser : 'Usuario';
      },
      async verificarAutenticacion() {
        const authStore = useAuthStore();
        await authStore.checkAuth();
      },
      handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
      },
      actualizarHora() {
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
        this.horaActual = horaCanarias.toLocaleTimeString('es-ES', { hour12: false });
      },

      async obtenerCitasConsulta() {
          try {
              const response = await apiClient.get('/api/citas');
              this.citasConsulta = response.data.filter(cita => cita.pacienteId !== null);
  
              //this.citasConsulta = response.data;
              console.log('Citas obtenidas:', response.data);
          } catch (error) {
              console.error('Error al obtener citas de consulta:', error);
          }
      },
      async obtenerEspecialidades() {
        try {
          const response = await apiClient.get('/api/departamentos/especialidades');
          this.especialidades = response.data;
        } catch (error) {
          console.error('Error al obtener especialidades:', error);
        }
      },
      async cargarMedicos() {
        if (!this.selectedEspecialidad) {
          this.medicos = [];
          return;
        }
        console.log('Especialidad seleccionada:', this.selectedEspecialidad); // Agregar log para verificar
        try {
          const response = await apiClient.get(`/api/usuarios/medicos?departamentoId=${this.selectedEspecialidad}`);
          this.medicos = response.data;
          console.log('Médicos cargados:', response.data); // Para verificar los médicos
  
        } catch (error) {
          console.error('Error al obtener médicos:', error);
        }
      },
      async cargarCitasDisponibles() {
        if (!this.selectedEspecialidad) {
          this.citasDisponibles = [];
          return;
        }
  
        const medicoFilter = this.selectedMedico ? `&medicoId=${this.selectedMedico}` : '';
        const pacienteFilter = `&pacienteId=null`;
        console.log('Obteniendo citas con filtros:', this.selectedEspecialidad, this.selectedMedico);
  
        try {
          const response = await apiClient.get(`/api/citas?especialidadId=${this.selectedEspecialidad}${medicoFilter}${pacienteFilter}`);
          this.citasDisponibles = response.data;
          console.log('Citas disponibles cargadas:', response.data);
        } catch (error) {
          console.error('Error al obtener citas:', error);
        }
      },
      async reservarCita(citaId, pacienteId) {
        try {
          // Validar si tenemos todos los datos necesarios
          if (!citaId || !pacienteId) {
            console.error('No se pudo reservar la cita. Faltan datos.');
            return;
          }
  
          // Realizar la petición PUT para reservar la cita
          const response = await apiClient.put(`/api/citas/${citaId}`, {
            pacienteId: pacienteId // Se asigna el paciente seleccionado
          });
  
          // Manejar la respuesta de éxito
          if (response.status === 200) {
            alert('Cita reservada con éxito');
            // Actualizar el estado de la lista de citas disponibles y las citas de consulta
            this.cargarCitasDisponibles();
            this.obtenerCitasConsulta();
          } else {
            console.error('Error al reservar la cita', response);
            alert('Hubo un error al reservar la cita');
          }
        } catch (error) {
          console.error('Error en la petición PUT', error);
          alert('Hubo un error al reservar la cita');
        }
      },
      async cancelarCita(citaId) {
        try {
          if (!citaId) {
            console.error('No se pudo cancelar la cita. Faltan datos.');
            return;
          }
  
          const response = await apiClient.put(`/api/citas/${citaId}`, {
            pacienteId: null // Cancelamos la cita al establecer pacienteId a null
          });
  
          if (response.status === 200) {
            alert('Cita cancelada con éxito');
            // Actualizamos la lista de citas disponibles y las citas de consulta
            this.cargarCitasDisponibles();
            this.obtenerCitasConsulta();
          } else {
            console.error('Error al cancelar la cita', response);
            alert('Hubo un error al cancelar la cita');
          }
        } catch (error) {
          console.error('Error en la petición PUT', error);
          alert('Hubo un error al cancelar la cita');
        }
      },
    },
    watch: {
      selectedEspecialidad() {
        this.cargarCitasDisponibles(); // Recargar citas disponibles cuando cambie la especialidad
      },
      selectedMedico() {
        this.cargarCitasDisponibles(); // Recargar citas disponibles cuando cambie el médico
      },
      selectedPaciente() {
        this.cargarCitasDisponibles(); // Recargar citas disponibles cuando cambie el paciente
      },
    },
    mounted() {
      this.verificarAutenticacion();
      this.actualizarHora();
      setInterval(() => {
        this.actualizarHora();
      }, 1000); // Actualiza la hora cada segundo

      console.log(this.obtenerCitasConsulta); // Verificar si el método está disponible
      this.obtenerEspecialidades();
      this.datosUsuario();
      this.obtenerCitasConsulta(); // Verificar si esto funciona sin errores
    },
  };
  </script>
  
  
<style scoped>
  .contenedor-principal {
    display: flex;
    justify-content: space-between;
  }
  
  .columna-formulario {
    width: 45%;
  }
  .columna-citas {
    width: 65%;
  }
  
  button {
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
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

  .vertical-line {
    width: 4px;
    height: 70px;
    background-color: #92bdf6; 
  }

  .user-head {
    position: relative;
    align-items: center;
    display: flex;
    margin-left: 2rem;
    justify-content: center;
  }

  .usuario-boton {
    color: var(--primary-color);
    text-decoration: none;
    cursor: pointer;
    font-size: 0.8em;
    margin-left: 0.4em;
  }

  .boton {
    background-color: #cbe3fd;
    color: #1c1c5a;
    font-size: 1.1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .boton:hover {
    background-color: #b0d4fc;
  }

  /* Estilo del círculo */
  .circle {
    width: 5rem; /* Tamaño del círculo */
    height: 5rem;
    border-radius: 50%; /* Hace que sea un círculo */
    background-color: var(--color-azul); /* Usa el color definido */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    margin: 0.5rem;
    margin-right: 20px; 

  }

  .alinear-elementos {
    display: flex;
    align-items: center;
  }

  label {
    font-size: 1.4rem; /* Ajusta el tamaño del texto de la clase label */
    font-weight: light; /* Aumenta el grosor de la fuente de letra */

  }

  .informacion {
    font-weight: bold; /* Aumenta el grosor de la fuente de letra */
    font-size: 1.6rem; /* Ajusta el tamaño del texto de nombreUsuario */
  }
  
  select, option {
    font-weight: bold; /* Aumenta el grosor de la fuente de letra */
    font-size: 1.6rem; /* Ajusta el tamaño del texto */
  }

  .error-cuadro {
    background-color: var(--error-color);
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
  }



  </style>
  