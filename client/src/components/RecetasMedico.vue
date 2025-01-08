<template>
  <div>
    <Header/>  <div class="estilo-pagina">
    <br>
    <div class="barra-fecha" >
      <span>{{ fechaHora }}</span>
    
      <div class="icon-container">
        {{ departamento.nombre }}
        <div class="circle" style="background-color: var(--color-azul2); width: 2rem; height: 2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
          <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
        </svg></div>
        
      </div>
    </div>

   <div class="contenedor-principal">
     <!-- Columna izquierda: Formulario de creación de recetas -->
     <div class="columna-formulario">
      <div class="alinear-elementos">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
              <path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z"/>
            </svg>
          </div>
          <h2 style="color: var(--primary-color);">Generar nueva receta</h2>
        </div>
        <br>

       <!-- Formulario para crear o editar una receta -->
       <form @submit.prevent="editarRecetaId ? actualizarReceta() : crearReceta()">

         <label> Paciente:
           <select v-model="nuevaReceta.pacienteId" required>
             <option disabled value="">Seleccione un paciente</option>
             <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id"> {{ paciente.nombre }} {{ paciente.apellidos }}</option>
           </select>
         </label>
         <!-- Selección de Fecha -->
         <label>Fecha:
           <input type="date" v-model="nuevaReceta.fecha" required />
         </label>
         <!-- Selección de Hora -->
         <label>Hora:
           <input type="time" v-model="nuevaReceta.hora" required />
         </label>
         <!-- Campo de Indicaciones -->
         <label>Medicamentos:
           <textarea v-model="nuevaReceta.medicamentos" class="textarea-azul"></textarea>
         </label>
         <!-- Campo de Observaciones -->
         <label>Observaciones:
           <textarea v-model="nuevaReceta.observaciones" class="textarea-azul"></textarea>
         </label>
         <!-- Botones de acción para crear o actualizar la receta -->

         <button class="boton-crear" type="submit" v-if="!editarRecetaId">
            Crear Receta
          </button>


         <button class="boton-crear" type="button" v-if="editarRecetaId" @click="actualizarReceta">
           Guardar Cambios
         </button>
         <button class="boton-crear" type="button" v-if="editarRecetaId" @click="cancelarEdicion" style="background-color: var(--color-rojo);">
           Cancelar
         </button>
       </form>
     </div>

     <!-- Columna derecha: Lista de recetas -->
     <div class="columna-citas">
      <div class="alinear-elementos">
       
       <div class="circle">
         <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
           <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
         </svg>
       </div>
       <h2 style="color: var(--primary-color);">Lista de recetas</h2>
     </div>

       <!-- Indicador de error y carga -->
       <v-alert
         v-if="errorServidor"
         type="error"
         class="alerta-error"
         prominent
         color="red lighten-3"
       >
         <span class="alert-text">Fallo de comunicación con el servidor</span>
       </v-alert>

       <div v-if="cargando && !errorServidor" class="text-center">
         <v-progress-circular
           :size="70"
           :width="7"
           color="#17195e"
           indeterminate
         ></v-progress-circular>
       </div>

       <div v-if="!cargando && !errorServidor && recetas.length === 0" class="texto-centrado">
         <p>La lista está vacía</p>
       </div>

       <!-- Tabla de recetas -->
       <table class="department-table" v-if="recetas.length !== 0">
         <thead>
           <tr>
             <th></th>
             <th>Médico</th>
             <th>Paciente</th>
             <th>Fecha</th>
             <th>Hora</th>
             <th>Medicamentos</th>
             <th>Observaciones</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="receta in recetas" :key="receta._id">
             <td class="department-actions">
               <div class="action-buttons">

                 <!-- Modificar Receta -->
  <button class="boton-crear" style="background-color: #e7c9b2; padding: 5px 25px;" @click="cargarReceta(receta)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
    </svg>
  </button>

<!-- Eliminar Receta -->
  <button class="boton-crear" style="background-color: var(--color-rojo); padding: 5px 25px;" @click="confirmarEliminacion(receta._id, receta.numero)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
  </svg>
  </button>
               </div>
             </td>
             <td>{{ receta.medicoId?.nombre }} {{ receta.medicoId?.apellidos }}</td>
             <td>{{ receta.pacienteId?.nombre }} {{ receta.pacienteId?.apellidos }}</td>
             <td>{{ receta.fecha }}</td>
             <td>{{ receta.hora }}</td>
             <td>{{ receta.medicamentos }}</td>
             <td>{{ receta.observaciones }}</td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
  </div></div>
</template>

<script>
import apiClient from '@/apiClient';
import Header from './Header.vue';
import { useAuthStore } from '../../store/auth';

export default {
  name: 'GestionRecetas',
  components: {
    Header
  },
  data() {
    return {
      fechaHora: '',
      recetas: [],
      nuevaReceta: {
        medicoId: '',
        pacienteId: '',
        fecha: '',
        hora: '',
        medicamentos: '',
        observaciones: ''
      },
      medico: {}, // Lista del médico
      departamento: '', // Departamento del médico
      pacientes: [], // Lista de pacientes
      prestaciones: [], // Lista de prestaciones
      fotoPreview: require('@/assets/estados/especialidad_defecto.png'),
      editarRecetaId: null,
      cargando: false,
      errorServidor: false
    };
  },
  methods: {
    datosUsuario() {
      const authStore = useAuthStore();
      this.medico = authStore.getUser ? authStore.getUser : 'Usuario';
      this.nuevaReceta.medicoId = this.medico._id;
      this.actualizarEspecialidadYPrestaciones();
    },
    obtenerFechaHoraCanarias() {
      const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };
  
      // Obtener la hora de Canarias (GMT+0)
      const ahora = new Date();
      const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));

      // Formatear la fecha y la hora
      const fechaFormateada = horaCanarias.toLocaleDateString('es-ES', opcionesFecha);
      const horaFormateada = horaCanarias.toLocaleTimeString('es-ES', opcionesHora).replace(':', '.');

      return `${fechaFormateada}, ${horaFormateada} h`;
    },
    async obtenerRecetas() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/recetas');
        const Recetas = response.data;
        console.log(Recetas);
        this.recetas = Recetas.filter(Recetas => Recetas.medicoId?._id === this.medico._id);
        console.log(this.medico._id);
        console.log(this.recetas);
      } catch (error) {
        this.errorServidor = true;
      } finally {
        this.cargando = false;
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
    async actualizarEspecialidadYPrestaciones() {
      if (!this.medico._id) {
        this.prestaciones = [];
        return;
      }

      this.cargando = true;
      try {
        const medicoResponse = await apiClient.get(`/api/usuarios/${this.medico._id}`);
        this.medico = medicoResponse.data; // Guardar datos del médico

        if (this.medico.departamento) {
          const departamentoResponse = await apiClient.get(`/api/departamentos/${this.medico.departamento}`);
          this.departamento = departamentoResponse.data;

          // Asegúrate de que las prestaciones existan y sean válidas
          this.prestaciones = Array.isArray(this.departamento.prestaciones)
            ? this.departamento.prestaciones
            : [];
          this.medico.especialidadId = this.departamento._id;
        } else {
          this.prestaciones = [];
        }
      } catch (error) {
        console.error('Error al obtener especialidad y prestaciones:', error);
      } finally {
        this.cargando = false;
      }
    },
    async crearReceta() {
      try {
        await apiClient.post('/api/recetas', this.nuevaReceta);
        this.obtenerRecetas();
        this.resetFormulario();
      } catch (error) {
        console.error('Error al crear receta:', error);
      }
    },
    cargarReceta(receta) {
      this.nuevaReceta = { ...receta };
      this.editarRecetaId = receta._id;
    },
    async actualizarReceta() {
      try {
        await apiClient.put(`/api/recetas/${this.editarRecetaId}`, this.nuevaReceta);
        this.obtenerRecetas();
        this.resetFormulario();
      } catch (error) {
        console.error('Error al actualizar receta:', error);
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    confirmarEliminacion(id, numero) {
      const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la receta ${numero}?`);
      if (confirmacion) {
        this.eliminarReceta(id);
      }
    },
    async eliminarReceta(id) {
      try {
        await apiClient.delete(`/api/recetas/${id}`);
        this.obtenerRecetas();
      } catch (error) {
        console.error('Error al eliminar receta:', error);
      }
    },
    resetFormulario() {
      this.nuevaReceta = { pacienteId: '', fecha: '', hora: '', medicamentos: '', observaciones: '' };
      this.editarRecetaId = null;
    }
  },
  mounted() {
    this.datosUsuario();
    this.obtenerPacientes();
    this.obtenerRecetas();
    this.fechaHora = this.obtenerFechaHoraCanarias();
    setInterval(() => {
      this.fechaHora = this.obtenerFechaHoraCanarias();
    }, 1000); // Actualiza la hora cada segundo
  }
};
</script>
  
  <style scoped>
  /* Contenedor principal para organizar formulario y lista en columnas */
  .contenedor-principal {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
  }
  
  
  /* Columna para la lista de medicos */
  .columna-lista {
    flex: 2;
    max-width: 60%; /* Controla el ancho de la columna de la lista */
  }
  
  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  label {
    margin-bottom: 10px;
    text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
    font-weight: bold; /* Resalta los labels */
  }
  

  
  .boton-agregar {
    background-color: var(--success-color) !important; /* Verde */
    color: white !important;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 8px;
    font-weight: bold;
  }


  .boton-eliminar-operacion {
    background-color: var(--error-color) !important; /* Verde */
    color: white !important;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-modificar {
    background-color: var(--warning-color) !important; /* Naranja */
    color: white !important;
    width: 40px; /* Hace el botón cuadrado */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .boton-eliminar {
    background-color: var(--error-color) !important; /* Rojo */
    color: white !important;
    width: 40px; /* Hace el botón cuadrado */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .boton-guardar {
    background-color: var(--success-color) !important; /* Verde */
    color: white !important;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-cancelar {
    background-color: var(--color-gris) !important; /* Gris */
    color: black !important;
    padding: 10px 20px;
    border-radius: 8px;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 8px;
    background-color: var(--background-color);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }
  
  /* Estilo para la alerta de error */
  .alerta-error {
    background-color: #f44336 !important;
    color: white !important;
  }
  
  .alert-text {
    margin-left: 20px;
  }
  
  .texto-centrado {
    text-align: center;
  }

  .foto-preview {
  width: 120px;
  height: 120px;
  border-radius: 20%;
  margin-top: 10px;
  object-fit: cover;
  margin-bottom: 30px;
  align-self: center;
}

  /* Estilo para los campos de entrada de texto, email y el selector */
input[type="text"],
input[type="email"],
select {
  width: 100%;             /* Ocupa el ancho completo del contenedor */
  height: 40px;           /* Ajusta la altura según tus necesidades */
  background-color: #C6DEFD; /* Color de fondo azul */
  padding: 10px;           /* Espacio interior */
  border-radius: 5px;      /* Bordes redondeados */
  font-family: 'Outfit', sans-serif; /* Asegura uniformidad de la fuente */
  resize: vertical;        /* Permite cambiar la altura, pero no el ancho */
  outline: none;           /* Remueve el borde de enfoque */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
input[type="text"]:focus,
input[type="email"]:focus,
select:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}

.department-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.department-table th,
.department-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
  vertical-align: top; /* Asegura que todo el contenido se alinee en la parte superior */
}

.department-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

/* Contenedor de los botones de acción en la misma línea */
.action-buttons {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
  align-items: center;
  justify-content: flex-start;
}

.department-actions {
  width: auto; /* Ajusta el ancho según el contenido */
}


.textarea-azul {
  width: 100%;             /* Ocupa el ancho completo del contenedor */
  height: 100px;           /* Ajusta la altura según tus necesidades */
  background-color: #C6DEFD; /* Color de fondo azul */
  padding: 10px;           /* Espacio interior */
  border-radius: 5px;      /* Bordes redondeados */
  font-family: 'Outfit', sans-serif; /* Asegura uniformidad de la fuente */
  resize: vertical;        /* Permite cambiar la altura, pero no el ancho */
  outline: none;           /* Remueve el borde de enfoque */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
.textarea-azul:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}

.contenedor-principal {
    display: flex;
    justify-content: space-between;
  }
  .contenedor-body {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}
  
  .columna-formulario {
    width: 30%;
  }
  .columna-citas {
    width: 65%;
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

  .barra-fecha {
    background-color: var(--primary-color);
    color: white;
    font-size: 1.1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;

    display: flex;
    align-items: center;

  }

  .boton-crear {
    background-color: var(--color-verde);
    color: var(--primary-color);
    font-size: 1.1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    margin-top: 6px;
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


  .informacion {
    font-weight: bold; /* Aumenta el grosor de la fuente de letra */
    font-size: 1.6rem; /* Ajusta el tamaño del texto de nombreUsuario */
  }
  
  select, option {
    font-weight: 500; /* Ajuste del grosor de la fuente de letra  */

  }


  .error-cuadro {
    background-color: var(--error-color);
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .icon-container {
    display: flex;
    align-items: center;
    gap: 10px; /* Espacio entre el círculo y el texto */
    margin-left: auto;
  }


  
  .citas-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .citas-table th,
  .citas-table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
    vertical-align: top; /* Asegura que el contenido se alinee en la parte superior */
    
  }

  .citas-table th {
    background-color: #f4f4f4;
    font-weight: bold;

  }

  .citas-table td {
    background-color: white;
    
  }

  .citas-actions {
    width: auto; /* Ajusta el ancho según el contenido */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn:hover {
    background-color: var(--color-azul); /* Cambia el color al pasar el ratón */
  }

  /* Estilo para los campos de entrada de texto, email y el selector */
  input[type="text"],
  input[type="date"],
  input[type="time"],
  input[type="number"],
  select {
    background-color: #C6DEFD; /* Color de fondo del campo */
    padding: 8px;
    border-radius: 5px;
    outline: none;
    width: 100%;
    font-weight: 400;
  }

  /* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
  input[type="text"]:focus,
  select:focus {
    border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
    box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
    background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
  }

  label {
    text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
    font-weight: bold; /* Resalta los labels */
  } 

  .btn {
  background-color: var(--color-azul2);
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
.text-box{

  height: 8rem;
  width: 25em; 
  background-color: #92bdf6; 
  border-radius: 0.5rem;
}
.small-box{
  height: 2rem;
  width: 25em; 
  background-color: #92bdf6; 
  border-radius: 0.5rem;
}
  .btn:hover {
    background-color: #1c1c5a;
    color: white;
  }

  .texto-centrado {
    text-align: center;
  }

  .alerta-error {
    margin-bottom: 20px;
  }

  .text-center {
    text-align: center;
}


</style>