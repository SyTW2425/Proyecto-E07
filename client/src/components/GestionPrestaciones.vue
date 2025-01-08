<template>
  <div>

    <Header/>
    <div class="contenedor-principal">
      <!-- Columna izquierda: Formulario de creación de prestaciones -->
      <div class="columna-formulario">
        <div class="alinear-elementos">
            <div class="circle">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="var(--primary-color)">
                  <path d="M480-254 330-104q-23 23-56 23t-56-23L104-218q-23-23-23-56t23-56l150-150-150-150q-23-23-23-56t23-56l114-114q23-23 56-23t56 23l150 150 150-150q23-23 56-23t56 23l114 114q23 23 23 56t-23 56L706-480l150 150q23 23 23 56t-23 56L742-104q-23 23-56 23t-56-23L480-254Zm0-266q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm-170-16 114-114-150-150-114 114 150 150Zm90 96q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm80 80q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm80-80q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520q-17 0-28.5 11.5T520-480q0 17 11.5 28.5T560-440Zm-24 130 150 150 114-114-150-150-114 114ZM339-621Zm282 282Z"/>
                </svg>
            </div>
            <h2 style="color: var(--primary-color);">Gestión de Prestaciones</h2>
          </div>
          <br>
  
        <!-- Formulario para crear o editar una prestación -->
        <form @submit.prevent="editarPrestacionId ? actualizarPrestacion() : crearPrestacion()">
            <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>

            <!-- Campo de Nombre -->
          <label>Nombre:
            <input
               type="text"
                v-model="nuevaPrestacion.nombre"
                required
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s-]+$"
                @input="validateNombre"
                @blur="validateRequired($event, 'El nombre solo puede contener letras, espacios, y guiones.')"
                @invalid="setCustomMessage($event, 'El nombre solo puede contener letras, espacios, y guiones.')"
            />
          </label>    
  
          <!-- Campo de Descripción -->
          <label>Descripción:
            <textarea v-model="nuevaPrestacion.descripcion" class="textarea-azul"></textarea>
          </label>

          <!-- Campo de Indicaciones -->
          <label>Indicaciones:
            <textarea v-model="nuevaPrestacion.indicaciones" class="textarea-azul"></textarea>
          </label>

  
          <!-- Botones de acción para crear o actualizar la prestación -->
          <button class="boton-crear" type="submit" v-if="!editarPrestacionId">
            Crear Prestación
          </button>
          <button class="boton-crear" type="button" v-if="editarPrestacionId" @click="actualizarPrestacion">
            Guardar Cambios
          </button>
          <button class="boton-crear" type="button" v-if="editarPrestacionId" @click="cancelarEdicion" style="background-color: var(--color-rojo);">

            Cancelar
          </button>
        </form>
      </div>
  
      <!-- Columna derecha: Lista de prestaciones -->
      <div class="columna-lista">
        <div class="alinear-elementos">
            <div class="circle">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="var(--primary-color)">
                  <path d="M480-254 330-104q-23 23-56 23t-56-23L104-218q-23-23-23-56t23-56l150-150-150-150q-23-23-23-56t23-56l114-114q23-23 56-23t56 23l150 150 150-150q23-23 56-23t56 23l114 114q23 23 23 56t-23 56L706-480l150 150q23 23 23 56t-23 56L742-104q-23 23-56 23t-56-23L480-254Zm0-266q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm-170-16 114-114-150-150-114 114 150 150Zm90 96q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm80 80q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm80-80q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520q-17 0-28.5 11.5T520-480q0 17 11.5 28.5T560-440Zm-24 130 150 150 114-114-150-150-114 114ZM339-621Zm282 282Z"/>
                </svg>
            </div>
            <h2 style="color: var(--primary-color);">Listado de Prestaciones</h2>
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
  
        <div v-if="!cargando && !errorServidor && prestaciones.length === 0" class="texto-centrado">
          <p>La lista está vacía</p>
        </div>
  
        <!-- Tabla de prestaciones -->
        <table class="department-table" v-if="prestaciones.length !== 0">
  <thead>
    <tr>
      <th></th>
      <th>Nombre</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="prestacion in prestaciones" :key="prestacion._id">
      <td class="department-actions">

        <!-- Modificar Prestación -->
  <button class="boton-crear" style="background-color: #e7c9b2; padding: 5px 25px;" @click="cargarPrestacion(prestacion)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
    </svg>
  </button>

<!-- Eliminar Prestación -->
  <button class="boton-crear" style="background-color: var(--color-rojo); padding: 5px 25px;" @click="confirmarEliminacion(prestacion._id, prestacion.nombre)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
  </svg>
  </button>
      </td>
      
      <td>{{ prestacion.nombre }}</td>
      <td>{{ prestacion.descripcion }}</td>
    </tr>
  </tbody>
</table>

      </div>
    </div></div>
  </template>
  
  <script>
  import apiClient from '@/apiClient';
  import Header from './Header.vue';
  
  export default {
    name: 'GestionPrestaciones',
    components: {
      Header
    },
    data() {
      return {
        prestaciones: [],
        nuevaPrestacion: {
          nombre: '',
          descripcion: '',
          indicaciones: ''
        },
        fotoPreview: require('@/assets/estados/especialidad_defecto.png'),
        editarFormId: null,
        cargando: false,
        errorServidor: false
      };
    },
    methods: {
      async obtenerPrestaciones() {
        this.cargando = true;
        try {
          const response = await apiClient.get('/api/prestaciones');
          this.prestaciones = response.data;
        } catch (error) {
          this.errorServidor = true;
        } finally {
          this.cargando = false;
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
      async crearPrestacion() {
        try {
          await apiClient.post('/api/prestaciones', this.nuevaPrestacion);
          this.obtenerPrestaciones();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al crear prestación:', error);
        }
      },
      cargarPrestacion(prestacion) {
        this.nuevaPrestacion = { ...prestacion };
        this.editarPrestacionId = prestacion._id;
      },
      async actualizarPrestacion() {
        try {
          await apiClient.put(`/api/prestaciones/${this.editarPrestacionId}`, this.nuevaPrestacion);
          this.obtenerPrestaciones();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al actualizar prestación:', error);
        }
      },
      cancelarEdicion() {
        this.resetFormulario();
      },
      confirmarEliminacion(id, nombre) {
        const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la prestación ${nombre}?`);
        if (confirmacion) {
          this.eliminarPrestacion(id);
        }
      },
      async eliminarPrestacion(id) {
        try {
          await apiClient.delete(`/api/prestaciones/${id}`);
          this.obtenerPrestaciones();
        } catch (error) {
          console.error('Error al eliminar prestación:', error);
        }
      },
      resetFormulario() {
        this.nuevaPrestacion = { nombre: '', descripcion: '', indicaciones: '' };
        this.editarPrestacionId = null;
      }
    },
    mounted() {
      this.obtenerPrestaciones();
    }
  };
  </script>
  
  <style scoped>
  /* Contenedor principal para organizar formulario y lista en columnas */
  .contenedor-principal {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 30px;
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