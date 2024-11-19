<template>
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de citas médicas -->
    <div class="columna-formulario">
      <h2>Crear Cita Médica</h2>

      <!-- Formulario para crear una cita médica -->
      <form @submit.prevent="crearCita">
        <!-- Selección de Médico -->
        <label>Médico:
          <select v-model="nuevaCita.medicoId" @change="actualizarEspecialidadYPrestaciones" required>
            <option disabled value="">Seleccione un médico</option>
            <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
              {{ medico.nombre }} {{ medico.apellidos }}
            </option>
          </select>
        </label>

        <!-- Especialidad (rellenado automáticamente) -->
        <label>Especialidad:
          <input type="text" :value="departamento.nombre || ''" readonly />
        </label>

        <!-- Selección de Prestación -->
        <label>Prestación:
          <select v-model="nuevaCita.prestacionId" required>
            <option disabled value="">Seleccione una prestación</option>
            <option v-for="prestacion in prestaciones" :key="prestacion._id || prestacion" :value="prestacion._id || prestacion">
              {{ prestacion.nombre || prestacion }}
            </option>
          </select>
        </label>


        <!-- Selección de Fecha -->
        <label>Fecha:
          <input type="date" v-model="nuevaCita.fecha" required />
        </label>

        
        <!-- Mostrar solo si la prestación seleccionada es "Consulta" -->
        <div v-if="esConsulta">

          <!-- Selección de Hora de Inicio -->
          <label>Hora de Inicio:
            <input type="time" v-model="nuevaCita.horaInicio" required />
          </label>

          <!-- Selección de Hora Final -->
          <label>Hora Final:
            <input type="time" v-model="nuevaCita.horaFinal" />
          </label>

          <!-- Selección de Duración -->
          <label>Duración (minutos):
            <input type="number" v-model="nuevaCita.duracion" min="1" />
          </label>

          <!-- Mostrar el número de citas calculadas -->
          <label>Número de Citas Médicas:
            <input type="number" :value="numeroCitas" readonly />
          </label>
        </div>

        

        <!-- Selección de Paciente -->
        <div v-if="!esConsulta">
          <!-- Selección de Hora de Inicio -->
          <label>Hora:
            <input type="time" v-model="nuevaCita.horaInicio" required />
          </label> 

          <!-- Selección de Duración -->
          <label>Duración (minutos):
            <input type="number" v-model="nuevaCita.duracion" min="1" />
          </label>

          <!-- Selección de Paciente -->
          <label>Paciente:
            <select v-model="nuevaCita.pacienteId" required>
              <option disabled value="">Seleccione un paciente</option>
              <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id">
              {{ paciente.nombre }} {{ paciente.apellidos }}
              </option>
            </select>
          </label>
        </div>


        <v-btn class="ma-2 boton-crear" type="submit" :disabled="cargando">
          Crear Cita
        </v-btn>
      </form>
    </div>

    <!-- Columna derecha: Listado de citas -->
    <div class="columna-lista">
      <h3>Listado de Citas Médicas</h3>

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
      <table class="citas-table" v-if="citas && citas.length !== 0">
        <thead>
          <tr>
            <th>Médico</th>
            <th>Especialidad</th>
            <th>Prestación</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Final</th>
            <th>Paciente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citas" :key="cita._id">
            <td>{{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}</td>
            <td>{{ cita.especialidadId.nombre }}</td>
            <td>{{ cita.prestacionId.nombre }}</td>
            <td>{{ cita.fecha | formatDate }}</td>
            <td>{{ cita.horaInicio }}</td>
            <td>{{ cita.horaFinal }}</td>
            <td>{{ cita.pacienteId ? cita.pacienteId.nombre + ' ' + cita.pacienteId.apellidos : 'Sin asignar' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
  data() {
    return {
      medicos: [], // Lista de médicos
      pacientes: [], // Lista de pacientes
      citas: [], // Lista de citas
      departamento: {}, // Datos del departamento del médico seleccionado
      prestaciones: [], // Prestaciones del departamento
      medico: {}, // Datos del médico seleccionado
      paciente: {}, // Datos del paciente seleccionado
      nuevaCita: {
        medicoId: '',
        especialidadId: '',
        prestacionId: '',
        fecha: '',
        horaInicio: '',
        horaFinal: '',
        duracion: '',
        pacienteId: ''
      },
      cargando: false,
      errorServidor: false
    };
  },
  methods: {
    async obtenerMedicos() {
      try {
        const response = await apiClient.get('/api/usuarios/medicos');
        this.medicos = response.data;
      } catch (error) {
        console.error('Error al obtener médicos:', error);
        this.errorServidor = true;
      }
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
    async obtenerCitas() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/citas');
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
    async crearCita() {
      try {
        await apiClient.post('/api/citas', this.nuevaCita);
        this.obtenerCitas();
        this.resetFormulario();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('Conflicto de horario: El médico ya tiene una cita en esta franja horaria.');
        } else {
          console.error('Error al crear cita:', error);
        }
      }
    },
    resetFormulario() {
      this.nuevaCita = {
        medicoId: '',
        especialidadId: '',
        prestacionId: '',
        fecha: '',
        horaInicio: '',
        horaFinal: '',
        duracion: '',
        pacienteId: ''
      };
      this.medico = {};
      this.departamento = {};
      this.prestaciones = [];
      this.paciente = {};
    }
  },
  mounted() {
    this.obtenerMedicos();
    this.obtenerPacientes();
    this.obtenerCitas();
  },
  computed: {
  esConsulta() {
    // Encuentra la prestación seleccionada
    const prestacion = this.prestaciones.find(
      (p) => p._id === this.nuevaCita.prestacionId
    );
    // Devuelve verdadero si el nombre de la prestación es "Consulta"
    return prestacion && prestacion.nombre === "Consulta";
  },
  numeroCitas() {
    if (!this.nuevaCita.horaInicio || !this.nuevaCita.horaFinal || !this.nuevaCita.duracion) {
      return 0; // Si falta algún campo, devolver 0
    }

    // Convertir horas a minutos totales desde la medianoche
    const [inicioHoras, inicioMinutos] = this.nuevaCita.horaInicio.split(':').map(Number);
    const [finalHoras, finalMinutos] = this.nuevaCita.horaFinal.split(':').map(Number);

    const inicioTotalMinutos = inicioHoras * 60 + inicioMinutos;
    const finalTotalMinutos = finalHoras * 60 + finalMinutos;

    // Calcular la duración total disponible
    const duracionDisponible = finalTotalMinutos - inicioTotalMinutos;

    if (duracionDisponible <= 0 || this.nuevaCita.duracion <= 0) {
      return 0; // Si el rango no es válido o la duración es 0, devolver 0
    }

    // Calcular cuántas citas caben en el rango disponible
    return Math.floor(duracionDisponible / this.nuevaCita.duracion);
  }
},

};
</script>


<style scoped>
/* Estilos similares a los de "Gestión Departamentos" */
.contenedor-principal {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.columna-formulario {
  flex: 1;
  max-width: 40%;
}

.columna-lista {
  flex: 2;
  max-width: 60%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.citas-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.citas-table th, .citas-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.citas-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.boton-crear {
  background-color: var(--primary-color);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}

.alerta-error {
  background-color: #f44336;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
