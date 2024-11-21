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
          <input type="text" :value="especialidadSeleccionada ? especialidadSeleccionada.nombre : ''" readonly />
        </label>

        <!-- Selección de Prestación -->
        <label>Prestación:
          <select v-model="nuevaCita.prestacionId" required>
            <option disabled value="">Seleccione una prestación</option>
            <option v-for="prestacion in prestacionesDisponibles" :key="prestacion._id" :value="prestacion._id">
            {{ prestacion.nombre }}
            </option>
          </select>
        </label>

        <!-- Selección de Fecha -->
        <label>Fecha:
          <input type="date" v-model="nuevaCita.fecha" required />
        </label>

        <!-- Selección de Hora de Inicio -->
        <label>Hora de Inicio:
          <input type="time" v-model="nuevaCita.horaInicio" required />
        </label>

        <!-- Selección de Hora Final -->
        <label>Hora Final:
          <input type="time" v-model="nuevaCita.horaFinal" required />
        </label>

        <!-- Selección de Duración -->
        <label>Duración (minutos):
          <input type="number" v-model="nuevaCita.duracion" min="1" required />
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
      <table class="citas-table" v-if="citas.length !== 0">
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
  name: 'AgendaMedico',
  data() {
    return {
      medicos: [], // Lista de médicos
      pacientes: [], // Lista de pacientes
      citas: [], // Lista de citas
      especialidadSeleccionada: {}, // Especialidad seleccionada para el médico actual
      prestacionesDisponibles: [], // Prestaciones de la especialidad seleccionada
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
  if (!this.nuevaCita.medicoId) return;
  this.cargando = true;
  try {
    // Obtener los detalles del médico seleccionado
    const medicoResponse = await apiClient.get(`/api/usuarios/${this.nuevaCita.medicoId}`);
    const medico = medicoResponse.data;

    if (medico.departamento) {
      // Obtener el departamento (especialidad) asociado al médico
      const departamentoResponse = await apiClient.get(`/api/departamentos/${medico.departamento}`);
      this.especialidadSeleccionada = departamentoResponse.data;
      this.prestacionesDisponibles = this.especialidadSeleccionada.prestaciones;
      this.nuevaCita.especialidadId = this.especialidadSeleccionada._id;
    } else {
      this.especialidadSeleccionada = null;
      this.prestacionesDisponibles = [];
    }
  } catch (error) {
    console.error('Error al obtener especialidad y prestaciones:', error);
  } finally {
    this.cargando = false;
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
        duracion: 0,
        pacienteId: ''
      };
      this.especialidadSeleccionada = null;
      this.prestacionesDisponibles = [];
    }
  },
  mounted() {
    this.obtenerMedicos();
    this.obtenerPacientes();
    this.obtenerCitas();
  }
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
