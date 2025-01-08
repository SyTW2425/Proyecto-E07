<template>
  <div> <Header/>
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de departamentos -->
    <div class="columna-formulario">
      <div class="alinear-elementos">
            <div class="circle">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 36C6 31.0347 17.9925 28 24 28C30.0075 28 42 31.0347 42 36V42H6V36Z" fill="var(--primary-color)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 26C29.5228 26 34 21.5228 34 16C34 10.4772 29.5228 6 24 6C18.4772 6 14 10.4772 14 16C14 21.5228 18.4772 26 24 26Z" fill="var(--primary-color)"/>
              </svg>

            </div>
            <h2 style="color: var(--primary-color);">Gestión de Departamentos</h2>
          </div>
          <br>

      <!-- Formulario para crear o editar un departamento -->
      <form @submit.prevent="editarDepartamentoId ? actualizarDepartamento() : crearDepartamento()">
        <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/><br>

        <!-- Campo de Nombre -->
        <label>Nombre:
          <input
            type="text"
            v-model="nuevoDepartamento.nombre"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateNombre"
            @blur="validateRequired($event, 'El nombre solo puede contener letras.')"
            @invalid="setCustomMessage($event, 'El nombre solo puede contener letras.')"
        />
      </label>

        <label>Tipo:
        <select v-model="nuevoDepartamento.tipo" required>
          <option value="" disabled selected>Seleccione tipo</option>
          <option value="Especialidad médica">Especialidad médica</option>
          <option value="Administración">Administración</option>
        </select>
      </label>

      <!-- Campo de Prestaciones -->
      <label v-if="nuevoDepartamento.tipo === 'Especialidad médica'">Prestaciones:
        <select v-model="prestacionTemp">
          <option disabled value="">Selecciona una prestación</option>
          <option v-for="prestacion in prestaciones" :key="prestacion._id" :value="prestacion._id">
            {{ prestacion.nombre }}
          </option>
        </select>
        <button @click.prevent="agregarPrestacion" class="boton-agregar">Agregar</button>
      </label>

      <!-- Lista de Prestaciones Añadidas -->
      <ul v-if="nuevoDepartamento.tipo === 'Especialidad médica'">
        <li v-for="(prestacionId, index) in nuevoDepartamento.prestaciones" :key="index">
          {{ obtenerNombrePrestacion(prestacionId) }}
          <button @click.prevent="eliminarPrestacion(index)" class="boton-eliminar-operacion">Eliminar</button>
        </li>
      </ul>


        <!-- Botones de acción para crear o actualizar el departamento -->
        <button class="boton-crear" type="submit" v-if="!editarDepartamentoId">
          Crear Departamento
        </button>
        <button class="boton-crear" type="button" v-if="editarDepartamentoId" @click="actualizarDepartamento">
          Guardar Cambios
        </button>
        <button class="boton-crear" type="button" v-if="editarDepartamentoId" @click="cancelarEdicion" style="background-color: var(--color-rojo);">
          Cancelar
        </button>
      </form>
    </div>

    <!-- Columna derecha: Lista de departamentos -->
    <div class="columna-lista">
      <div class="alinear-elementos">  
         <div class="circle">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 16.5C18 18.9862 15.9862 21 13.5 21C11.0138 21 9 18.9862 9 16.5C9 14.0138 11.0138 12 13.5 12C15.9862 12 18 14.0138 18 16.5Z" fill="var(--primary-color)"/>
                <path d="M4 28.3333C4 24.7867 10.3294 23 13.5 23C16.6706 23 23 24.7867 23 28.3333V36H4V28.3333Z" fill="var(--primary-color)"/>
                <path d="M39 16.5C39 18.9862 36.9863 21 34.5 21C32.0138 21 30 18.9862 30 16.5C30 14.0138 32.0138 12 34.5 12C36.9863 12 39 14.0138 39 16.5Z" fill="var(--primary-color)"/>
                <path d="M27 15C27 16.6575 25.6575 18 24 18C22.3425 18 21 16.6575 21 15C21 13.3425 22.3425 12 24 12C25.6575 12 27 13.3425 27 15Z" fill="var(--primary-color)"/>
                <path d="M25 28.3333C25 24.7867 31.3294 23 34.5 23C37.6706 23 44 24.7867 44 28.3333V36H25V28.3333Z" fill="var(--primary-color)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7508 22.185C28.4839 22.2831 28.2206 22.3873 27.9625 22.4975C26.7914 22.998 25.6088 23.6741 24.69 24.5785C24.444 24.8208 24.2105 25.0864 24 25.375C23.7895 25.0864 23.556 24.8208 23.3099 24.5785C22.3912 23.6741 21.2085 22.998 20.0374 22.4975C19.7794 22.3873 19.5161 22.2831 19.2491 22.185C20.7717 21.3961 22.7298 21 24 21C25.2701 21 27.2282 21.3961 28.7508 22.185Z" fill="var(--primary-color)"/>
              </svg>
         </div>
         <h2 style="color: var(--primary-color);">Listado de Departamentos</h2>
       </div>

      <!-- Filtro por tipo de departamento -->
      <div class="buscador" style="height: 60px; margin-right: 1px; padding-right: 1px;">
      <label for="filtroTipo">Filtrar por tipo:</label>
      <select v-model="filtroTipo">
        <option value="">Todos</option>
        <option value="Especialidad médica">Especialidad médica</option>
        <option value="Administración">Administración</option>
      </select>
    </div><br>

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

      <div v-if="!cargando && !errorServidor && departamentos.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>


    <!-- Tabla de departamentos -->
    <table class="department-table" v-if="departamentosFiltrados.length !== 0">
<thead>
  <tr>
    <th></th>
    <th>Nombre</th>
    <th>Tipo</th>
    <th>Prestaciones</th>
  </tr>
</thead>
<tbody>
  <tr v-for="departamento in departamentosFiltrados" :key="departamento._id">

    <td class="department-actions">

<!-- Modificar Usuario -->
  <button class="boton-crear" style="background-color: #e7c9b2; padding: 5px 25px;" @click="cargarDepartamento(departamento)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
    </svg>
  </button>

<!-- Eliminar Usuario -->
  <button class="boton-crear" style="background-color: var(--color-rojo); padding: 5px 25px;" @click="confirmarEliminacion(departamento._id, departamento.tipo, departamento.nombre)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
  </svg>
  </button>
    </td>


    <td>{{ departamento.nombre }}</td>
    <td>{{ departamento.tipo }}</td>
    <td>{{ departamento.prestaciones.map(id => obtenerNombrePrestacion(id)).join(', ') }}</td>
  </tr>
</tbody>
</table>


    </div>
  </div></div>
</template>

<script>
import apiClient from '@/apiClient';
import Header from '@/components/Header.vue';

export default {
  name: 'GestionDepartamentos',
  components: {
    Header
  },
data() {
  return {
    departamentos: [],
    prestaciones: [], // Lista de prestaciones disponibles
    nuevoDepartamento: {
      nombre: '',
      tipo: '',
      prestaciones: []
    },
    fotoPreview: require('@/assets/estados/departamento_defecto.png'),
    prestacionTemp: '', // Prestación temporal
    editarDepartamentoId: null,
    cargando: false,
    errorServidor: false,
    filtroTipo: '' 
  };
  },
  computed: {
  departamentosFiltrados() {
      if (this.filtroTipo) {
        return this.departamentos.filter(departamento => departamento.tipo === this.filtroTipo);
      }
      return this.departamentos;
    }
  },
  methods: {
    async obtenerDepartamentos() {
      this.cargando = true;
      this.errorServidor = false;
      try {
        const response = await apiClient.get('/api/departamentos');
        this.departamentos = response.data;
      } catch (error) {
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },
    async obtenerPrestaciones() {
      try {
        const response = await apiClient.get('/api/prestaciones');
        this.prestaciones = response.data;
      } catch (error) {
        console.error('Error al obtener prestaciones:', error);
      }
    },
    agregarPrestacion() {
      if (this.prestacionTemp && !this.nuevoDepartamento.prestaciones.includes(this.prestacionTemp)) {
        this.nuevoDepartamento.prestaciones.push(this.prestacionTemp);
      }
      this.prestacionTemp = ''; // Limpia el campo después de agregar
    },
    eliminarPrestacion(index) {
      this.nuevoDepartamento.prestaciones.splice(index, 1);
    },
    obtenerNombrePrestacion(prestacionId) {
      const prestacion = this.prestaciones.find(p => p._id === prestacionId);
      return prestacion ? prestacion.nombre : '';
    },
    async crearDepartamento() {
      try {
        await apiClient.post('/api/departamentos', this.nuevoDepartamento);
        this.obtenerDepartamentos();
        this.resetFormulario();
      } catch (error) {
        console.error('Error al crear departamento:', error);
      }
    },
    cargarDepartamento(departamento) {
      this.nuevoDepartamento = { ...departamento };
      this.editarDepartamentoId = departamento._id;
    },
    async actualizarDepartamento() {
      try {
        await apiClient.put(`/api/departamentos/${this.editarDepartamentoId}`, this.nuevoDepartamento);
        this.obtenerDepartamentos();
        this.resetFormulario();
      } catch (error) {
        console.error('Error al actualizar departamento:', error);
      }
    },
    async confirmarEliminacion(id) {
      const confirmacion = window.confirm('¿Está seguro de que desea eliminar este departamento?');
      if (confirmacion) {
        this.eliminarDepartamento(id);
      }
    },
    async eliminarDepartamento(id) {
      try {
        await apiClient.delete(`/api/departamentos/${id}`);
        this.obtenerDepartamentos();
      } catch (error) {
        console.error('Error al eliminar departamento:', error);
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    resetFormulario() {
      this.nuevoDepartamento = { nombre: '', tipo: '', prestaciones: [] };
      this.editarDepartamentoId = null;
      // this.fotoPreview = require('@/assets/estados/departamento_defecto.png');
    },
  validateNombre(event) {
    event.target.setCustomValidity('');
    if (!event.target.value) {
      event.target.setCustomValidity('Este campo es obligatorio');
    } else if (!event.target.checkValidity()) {
      event.target.setCustomValidity('El nombre solo puede contener letras.');
    }
  },

  validateRequired(event, message) {
    event.target.setCustomValidity(''); // Resetea el mensaje personalizado
    if (!event.target.value) {
      event.target.setCustomValidity('Este campo es obligatorio');
    } else if (!event.target.checkValidity()) {
      event.target.setCustomValidity(message);
    }
  },

  setCustomMessage(event, message) {
    if (!event.target.value) {
      event.target.setCustomValidity('Este campo es obligatorio');
    } else {
      event.target.setCustomValidity(message);
    }
  },
    
  },
  mounted() {
      this.obtenerDepartamentos();
      this.obtenerPrestaciones(); // Cargar prestaciones al montar el componente
      this.intervalId = setInterval(() => {
          this.obtenerDepartamentos();
      }, 60000); // Cada 10 segundos
  },
  beforeDestroy() {
      clearInterval(this.intervalId);
  },
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

/* Columna para el formulario de creación de departamentos */
.columna-formulario {
  flex: 1;
  max-width: 30%; /* Controla el ancho de la columna del formulario */
}

/* Columna para la lista de departamentos */
.columna-lista {
  flex: 2;
  max-width: 65%; /* Controla el ancho de la columna de la lista */
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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



/* Tabla de departamentos con diseño similar a "Prestaciones" */
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
vertical-align: top; /* Asegura que el contenido se alinee en la parte superior */
}

.department-table th {
background-color: #f4f4f4;
font-weight: bold;
}

.department-table td {
background-color: white;
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


/* Botones de acción */
.boton-modificar {
background-color: var(--warning-color) !important;
color: white !important;
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 8px;
}

.boton-eliminar {
background-color: var(--error-color) !important;
color: white !important;
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 8px;
}


/* Estilos añadidos */

.alinear-elementos {
  display: flex;
  align-items: center;
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

    .buscador {
      margin-top: 20px;
      margin-bottom: 5px;
      padding: 10px;
      width: 100%;
      max-width: 24%;
      border-radius: 5px;
      color: var(--primary-color);
    }

    input[type="text"],
    input[type="date"],
    input[type="time"],
    input[type="number"],
    input[type="email"],
    input[type="password"],
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
  margin-bottom: 10px;
  text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
  font-weight: bold; /* Resalta los labels */
  width: 100%;

}

/* Botones estilizados */
.boton-crear {
      margin-top: 6px;
      background-color: var(--color-verde);
      color: var(--primary-color);
      font-size: 1.1rem;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }




</style>
