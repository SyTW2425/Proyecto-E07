<template>
  <div class="estilo-pagina">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">INTRANET</h1>

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

  <div v-if="!esMedico" class="error-cuadro">
    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="var(--background-color)">
      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z"/>
    </svg>
    <strong>Error: </strong>El usuario no es un Médico
  </div>
  <div class="contenedor-principal">
    

    <!-- Columna izquierda: Formulario de creación de citas médicas -->
    <div class="columna-formulario">
      <div class="alinear-elementos">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
              <path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z"/>
            </svg>
          </div>
          <h2 style="color: var(--primary-color);">Generar nuevas citas</h2>
        </div>
        <br>

      <!-- Formulario para crear una cita médica -->
      <form @submit.prevent="crearCita">
        <!-- Mostrar el nombre del médico seleccionado -->
        <label>Médico: <span>{{ medico.nombre }} {{ medico.apellidos }}</span></label>
        <br>
        <label>ID Médico: <span>{{ medico._id }}</span></label>
        <br>
        <!-- Especialidad (rellenado automáticamente) -->
        <label>Especialidad:
          <span>{{ departamento.nombre }}</span>
        </label>
        <br>
        <label>ID Especialidad: <span>{{ departamento._id }}</span></label>
        <br>
        <br>

        <!-- Selección de Prestación -->
        <label>Prestación:
          <select v-model="nuevaCita.prestacionId" required>
            <option disabled value="">Seleccione una prestación</option>
            <option v-for="prestacion in prestaciones" :key="prestacion._id || prestacion" :value="prestacion._id || prestacion">
              {{ prestacion?.nombre || prestacion }}
            </option>
          </select>
        </label>
        <br>
        <label>ID Prestación: <span>{{ nuevaCita.prestacionId }}</span></label>
        <br>
        <br>


        <!-- Selección de Fecha -->
        <label>Fecha:
          <input type="date" v-model="nuevaCita.fecha" required />
        </label>

        <br>
        <label>DATE: <span>{{ nuevaCita.fecha }}</span></label>
        <br>

        
        <!-- Mostrar solo si la prestación seleccionada es "Consulta" -->
        <div v-if="esConsulta">

          <!-- Selección de Hora de Inicio -->
          <label>Hora de Inicio:
            <input type="time" v-model="horaInicio" required />
          </label>

          <!-- Selección de Hora Final -->
          <label>Hora Final:
            <input type="time" v-model="horaFinal" />
          </label>

          <!-- Selección de Duración -->
          <label>Duración (minutos):
            <input type="number" v-model="nuevaCita.duracion" min="1" />
          </label>

          <!-- Número de citas calculadas -->
          <label>Número de Citas Médicas: <strong>{{ citasCalculadas.total }}</strong></label>
          <div>
            <!-- Lista numerada con los horarios -->
            <ul>
              <li v-for="(horario, index) in calculoCitas().horarios" :key="index">
                {{ horario }}
              </li>
            </ul>
          </div>


        </div>

        

        <!-- Selección de Paciente -->
        <div v-if="!esConsulta">
          <!-- Selección de Hora de Inicio -->
          <label>Hora:
            <input type="time" v-model="nuevaCita.hora" required />
          </label> 

          <!-- Selección de Duración -->
          <label>Duración (minutos):
            <input type="number" v-model="nuevaCita.duracion" min="1" />
          </label>

          <br>
          <br>


          <!-- Selección de Paciente -->
          <label>Paciente:
            <select v-model="nuevaCita.pacienteId" required>
              <option disabled value="">Seleccione un paciente</option>
              <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id">
                {{ paciente?.nombre }} {{ paciente?.apellidos }}
              </option>
            </select>
          </label>

        </div>

        <br>
        <br>


        <button v-if="esMedico" class="boton-crear" type="button" :disabled="cargando" @click="procesarCitas">
          Crear Cita
        </button>


        
      </form>
    </div>

    <!-- Columna derecha: Listado de citas -->
    <div class="columna-citas">
      <div class="alinear-elementos">
       
       <div class="circle">
         <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
           <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
         </svg>
       </div>
       <h2 style="color: var(--primary-color);">Agenda</h2>
     </div>


      <!-- Mensaje de error de comunicación -->
      <v-alert v-if="errorServidor" type="error" class="alerta-error" prominent color="red lighten-3">
        <span class="alert-text">Fallo de comunicación con el servidor</span>
      </v-alert>

      <div v-if="cargando && !errorServidor" class="text-center">
        <v-progress-circular :size="70" :width="7" color="#17195e" indeterminate></v-progress-circular>
      </div>

      <div v-if="!cargando && !errorServidor && citas.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>

      <!-- Tabla de citas -->
      <table v-if="!cargando && !errorServidor && citasFiltradas.length > 0" class="citas-table">

        <thead>
          <tr>
            <th></th>
            <th>Prestación</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Duración</th>
            <th>Paciente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citasFiltradas" :key="cita._id">
            <td class="user-actions">
            <v-btn class="boton-eliminar" @click="confirmarEliminacion(cita._id)">
              <i class="bi bi-trash"></i>
            </v-btn>
          </td>
            <td>{{ cita.prestacionId?.nombre }}</td>
            <td>{{ formatearFecha(cita.fechaHora) }}</td>
            <td>{{ formatearHora(cita.fechaHora) }}</td>
            <td>{{ cita.duracion }}</td>
            <td>{{ cita.pacienteId ? cita.pacienteId.nombre + ' ' + cita.pacienteId.apellidos : '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';

export default {
  data() {
    return {
      horaActual: '',
      pacientes: [], // Lista de pacientes
      citas: [], // Lista de citas
      departamento: {}, // Datos del departamento del médico seleccionado
      prestaciones: [], // Prestaciones del departamento
      medico: {}, // Datos del médico seleccionado
      paciente: {}, // Datos del paciente seleccionado
      horaFinal: '',
      horaInicio: '',
      nuevaCita: {
        medicoId: '',
        especialidadId: '',
        prestacionId: '',
        fecha: '',
        hora: '',
        duracion: ''
      },
      cargando: false,
      errorServidor: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    datosUsuario() {
      const authStore = useAuthStore();
      this.medico = authStore.getUser ? authStore.getUser : 'Usuario';
      this.nuevaCita.medicoId = this.medico._id;
      this.actualizarEspecialidadYPrestaciones();
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

    async obtenerPacientes() {
      try {
        const response = await apiClient.get('/api/usuarios/pacientes');
        this.pacientes = response.data;
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
        this.errorServidor = true;
      }
    },
    filtrarCitas() {
      // Este método ya está cubierto por el filtro en `citasFiltradas`
    },
    async obtenerCitas() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/citas', {
          params: {
            medicoId: this.medico._id
          }
        });
        this.citas = response.data;
      } catch (error) {
        console.error('Error al obtener citas:', error);
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },
    async actualizarEspecialidadYPrestaciones() {
      if (!this.nuevaCita.medicoId) {
        this.departamento = {};
        this.prestaciones = [];
        return;
      }

      this.cargando = true;
      try {
        const medicoResponse = await apiClient.get(`/api/usuarios/${this.nuevaCita.medicoId}`);
        this.medico = medicoResponse.data; // Guardar datos del médico

        if (this.medico.departamento) {
          const departamentoResponse = await apiClient.get(`/api/departamentos/${this.medico.departamento}`);
          this.departamento = departamentoResponse.data;

          // Asegúrate de que las prestaciones existan y sean válidas
          this.prestaciones = Array.isArray(this.departamento.prestaciones)
            ? this.departamento.prestaciones
            : [];
          this.nuevaCita.especialidadId = this.departamento._id;
        } else {
          this.departamento = {};
          this.prestaciones = [];
        }
        console.log('Departamento:', this.departamento);
        console.log('Prestaciones:', this.prestaciones);


      } catch (error) {
        console.error('Error al obtener especialidad y prestaciones:', error);
      } finally {
        this.cargando = false;
      }
    },
    async actualizarPacienteSeleccionado() {
      if (!this.nuevaCita.pacienteId) {
        this.paciente = {};
        return;
      }
      try {
        const pacienteResponse = await apiClient.get(`/api/usuarios/${this.nuevaCita.pacienteId}`);
        this.paciente = pacienteResponse.data;
      } catch (error) {
        console.error('Error al obtener paciente:', error);
      }
    },
    async procesarCitas() {
      try {

        this.cargando = true;

        if (this.esConsulta) {
          // Obtener los horarios de inicio calculados previamente
          const { horarios } = this.calculoCitas();

          // Verificar que tengamos horarios disponibles
          if (horarios.length === 0) {
            alert('No hay citas disponibles en el rango de tiempo.');
            return;
          }
        
        // Garantizamos que la duración sea un número entero
        this.nuevaCita.duracion = parseInt(this.nuevaCita.duracion, 10);

        // Crear múltiples citas con los horarios calculados
        const citas = horarios.map((horaInicio) => {
          console.log(`Creando cita para ${horaInicio}, datos:`, this.nuevaCita);
          return {
            ...this.nuevaCita,  // Desestructuramos nuevaCita
            hora: horaInicio    // Asignamos hora al campo "hora"
          };
        });


        const resultados = await Promise.allSettled(citas.map((cita) => this.crearCita(cita)));
        resultados.forEach((resultado, index) => {
          if (resultado.status === "rejected") {
            console.error(`Error al crear cita ${index}:`, resultado.reason);
          }
        });
        
        //await Promise.all(citas.map((cita) => this.crearCita(cita)));
        } else {
          // Crear una sola cita
          await this.crearCita(this.nuevaCita);
        }
      } catch (error) {
        console.error('Error al procesar citas:', error);
        alert('Ocurrió un error al crear las citas');
      } finally {
        this.cargando = false;
      }
    },
    validarDatosCita(cita) {
    if (!cita.medicoId) throw new Error("El ID del médico es obligatorio.");
    if (!cita.especialidadId) throw new Error("La especialidad es obligatoria.");
    if (!cita.prestacionId) throw new Error("La prestación es obligatoria.");
    if (!cita.fecha || isNaN(Date.parse(cita.fecha))) throw new Error("La fecha es inválida.");
    if (!cita.hora) throw new Error("La hora es obligatoria.");
    if (!cita.duracion || cita.duracion <= 0) throw new Error("La duración debe ser mayor que 0.");
    
    },
    formatearFecha(fechaHora) {
      const fecha = new Date(fechaHora);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },
    formatearHora(fechaHora) {
      const fecha = new Date(fechaHora);
      const horas = String(fecha.getHours()).padStart(2, '0');
      const minutos = String(fecha.getMinutes()).padStart(2, '0');
      return `${horas}:${minutos} h`;
    },
    async crearCita(cita) {
      try {
        this.validarDatosCita(cita); // Verificar los datos antes de enviarlos
        console.log('Datos enviados:', cita);
        // Realizar la petición para crear la cita
        await apiClient.post('/api/citas', cita);
        this.resetFormulario();
        this.obtenerCitas();
      } catch (error) {
        console.error('Error al crear cita:', error);
        throw error; // Relanzar el error para manejarlo en procesarCitas
      }
    },
    calculoCitas() {
    if (!this.horaInicio || !this.horaFinal || !this.nuevaCita.duracion) {
      return { total: 0, horarios: [] }; // Si falta algún campo, devolver 0 y un arreglo vacío
    }

    // Convertir las horas de inicio y fin a minutos totales desde la medianoche
    const [inicioHoras, inicioMinutos] = this.horaInicio.split(':').map(Number);
    const [finalHoras, finalMinutos] = this.horaFinal.split(':').map(Number);

    const inicioTotalMinutos = inicioHoras * 60 + inicioMinutos;
    const finalTotalMinutos = finalHoras * 60 + finalMinutos;

    // Calcular la duración total disponible
    const duracionDisponible = finalTotalMinutos - inicioTotalMinutos;

    if (duracionDisponible <= 0 || this.nuevaCita.duracion <= 0) {
      return { total: 0, horarios: [] }; // Si el rango no es válido o la duración es 0, devolver 0
    }

    // Calcular cuántas citas caben en el rango disponible
    const totalCitas = Math.floor(duracionDisponible / this.nuevaCita.duracion);

    // Calcular los horarios de inicio de cada cita
    const horarios = [];
    let inicioActual = inicioTotalMinutos;


    for (let i = 0; i < totalCitas; i++) {
      // Calcular horas y minutos del horario actual
      const horas = Math.floor(inicioActual / 60); // Obtener horas
      const minutos = inicioActual % 60; // Obtener minutos
      const horarioFormateado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`; // Formatear correctamente
      horarios.push(horarioFormateado);

      // Incrementar el tiempo por la duración de cada cita
      inicioActual += +this.nuevaCita.duracion;
    }

    return { total: totalCitas, horarios };
    },
    resetFormulario() {
      this.nuevaCita = {
        prestacionId: '',
        fecha: '',
        hora: '',
        duracion: '',
        pacienteId: ''
      };
      this.prestaciones = [];
      this.paciente = {};
      this.horaInicio = '';
      this.horaFinal = '';
    },
    confirmarEliminacion(id) {
      const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la cita?`);
      if (confirmacion) {
        this.eliminarCita(id);
      }
    },
    async eliminarCita(id) {
      try {
        await apiClient.delete(`/api/citas/${id}`);
        this.obtenerCitas();
      } catch (error) {
        console.error('Error al eliminar cita:', error);
      }
    },
    async obtenerDatos() {
      // Obtener todas las citas, especialidades y médicos al montar el componente
      await Promise.all([this.obtenerCitas()]);
    },
    validarFechaHora() {
      const hoy = new Date();
      const fechaSeleccionada = new Date(this.nuevaCita.fecha);
      const horaSeleccionada = this.nuevaCita.hora.split(':');
      fechaSeleccionada.setHours(horaSeleccionada[0], horaSeleccionada[1]);

      if (fechaSeleccionada < hoy) {
        alert('La fecha y hora seleccionadas ya han pasado.');
        return false;
      }
      return true;
    },
    async validarCitaDuplicada() {
      const citasExistentes = await apiClient.get(`/api/citas?medicoId=${this.nuevaCita.medicoId}&fecha=${this.nuevaCita.fecha}&hora=${this.nuevaCita.hora}`);
      if (citasExistentes.data.length > 0) {
        alert('Ya existe una cita para este médico en esa fecha y hora.');
        return true;
      }
      return false;
    }

  },
  validarFormulario() {
    if (!this.nuevaCita.medicoId) {
      alert('Debe seleccionar un médico.');
      return false;
    }
    if (!this.nuevaCita.fecha) {
      alert('Debe seleccionar una fecha.');
      return false;
    }
    if (!this.nuevaCita.hora) {
      alert('Debe seleccionar una hora.');
      return false;
    }
    return true;
  },
  created() {
    this.obtenerCitas();
  },
  mounted() {
    this.obtenerDatos();
    this.intervalId = setInterval(() => {
      this.obtenerCitas();
    }, 60000); // Actualiza cada 1 minuto
    this.obtenerPacientes();

    this.verificarAutenticacion();
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000); // Actualiza la hora cada segundo
    this.datosUsuario();


    

  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  computed: {
    nombreUsuario() {
      const authStore = useAuthStore();
      return authStore.getUser ? `${authStore.getUser.nombre} ${authStore.getUser.apellidos}` : 'Usuario';
    },

    esMedico() {
      return this.medico.tipo === 'Médico';
    },

    citasFiltradas() {
      let citasFiltradas = this.citas;

      if (this.filtroEspecialidad) {
        citasFiltradas = citasFiltradas.filter(cita => cita.especialidad._id === this.filtroEspecialidad);
      }

      if (this.filtroMedico) {
        citasFiltradas = citasFiltradas.filter(cita => cita.medico._id === this.filtroMedico);
      }

      return citasFiltradas;
    },
    citasCalculadas() {
    return this.calculoCitas();
    },
    esConsulta() {
    // Encuentra la prestación seleccionada
    const prestacion = this.prestaciones.find(
      (p) => p._id === this.nuevaCita.prestacionId
    );
    // Devuelve verdadero si el nombre de la prestación es "Consulta"
    return prestacion && prestacion.nombre === "Consulta";
    },
  
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

  .boton-crear {
    background-color: var(--color-verde);
    color: var(--primary-color);
    font-size: 1.1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .boton-crear:hover {
    background-color: var(--color-azul2);
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
  