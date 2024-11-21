<template>
    <div class="contenedor-principal">
      <!-- Columna izquierda -->
      <div class="columna-formulario">
        <h2>Reservar Cita Médica</h2>
        
        <!-- Selector de Paciente -->
        <label>Paciente:
          <select v-model="selectedPaciente">
            <option value="">Seleccione un paciente</option>
            <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id">
              {{ paciente.nombre }} {{ paciente.apellidos }}
            </option>
          </select>
        </label>
  
        <!-- Selector de Especialidad -->
        <label>Especialidad:
          <select v-model="selectedEspecialidad" @change="cargarMedicos">
            <option value="">Seleccione una especialidad</option>
            <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad._id">
              {{ especialidad.nombre }}
            </option>
          </select>
        </label>
  
        <!-- Selector de Médico -->
        <label>Médico:
          <select v-model="selectedMedico">
            <option value="">Cualquiera</option>
            <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
              {{ medico.nombre }} {{ medico.apellidos }}
            </option>
          </select>
        </label>
  
        <!-- Mostrar las citas disponibles -->
<div v-if="citasDisponibles.length > 0">
  <div v-for="(cita, index) in citasDisponibles" :key="index">
    <td>Fecha: {{ cita.fecha | formatDate }}. Hora: {{ cita.hora }}. Especialista: {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}</td>
    
    <div>
      <!-- Mostrar el botón de "Reservar cita" solo si hay un paciente y una especialidad seleccionados -->
      <button v-if="selectedPaciente && selectedEspecialidad"
              @click="reservarCita(cita._id, selectedPaciente)">
        Reservar cita
      </button>
    </div>

    <div>
      <button v-for="(horario, horaIndex) in cita.horarios" :key="horaIndex" 
              @click="reservarCita(cita.medicoId, cita.fecha, horario)">
        {{ horario }} - {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}
      </button>
    </div>
  </div>
</div>

  
        <div v-else>
          <p>No hay citas disponibles.</p>
        </div>
      </div>
    </div>
  </template>
  

  <script>
import apiClient from '@/apiClient';

export default {
  name: "ReservarCitas",
  data() {
    return {
      pacientes: [], // Lista de pacientes
      especialidades: [], // Lista de especialidades
      medicos: [], // Lista de médicos filtrados por especialidad
      citasDisponibles: [], // Citas filtradas por paciente, especialidad y médico
      selectedPaciente: '', // Paciente seleccionado
      selectedEspecialidad: '', // Especialidad seleccionada
      selectedMedico: '', // Médico seleccionado
    };
  },
  methods: {
    async obtenerPacientes() {
      try {
        const response = await apiClient.get('/api/usuarios/pacientes');
        this.pacientes = response.data;
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
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

      try {
        const response = await apiClient.get(`/api/usuarios/medicos?departamentoId=${this.selectedEspecialidad}`);
        this.medicos = response.data;
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

      try {
        const response = await apiClient.get(`/api/citas?especialidadId=${this.selectedEspecialidad}${medicoFilter}${pacienteFilter}`);
        this.citasDisponibles = response.data;
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
        // Opcional: Actualizar el estado de la lista de citas disponibles
        this.cargarCitasDisponibles();
      } else {
        console.error('Error al reservar la cita', response);
        alert('Hubo un error al reservar la cita');
      }
    } catch (error) {
      console.error('Error en la petición PUT', error);
      alert('Hubo un error al reservar la cita');
    }

    }
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
    this.obtenerPacientes();
    this.obtenerEspecialidades();
  }
};
</script>

<style scoped>
.contenedor-principal {
  display: flex;
  justify-content: space-between;
}

.columna-formulario {
  width: 50%;
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
</style>
