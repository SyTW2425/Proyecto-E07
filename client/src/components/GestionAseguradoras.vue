<template>
  <div>

  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de aseguradoras -->
    <div class="columna-formulario">
      <div class="alinear-elementos">
            <div class="circle">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="var(--primary-color)" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z" fill="var(--primary-color)"/>
              </svg>
            </div>
            <h2 style="color: var(--primary-color);">Gestión de Aseguradoras</h2>
          </div>
          <br>

      <!-- Formulario para crear o editar una aseguradora -->
      <form @submit.prevent="editarAseguradoraId ? actualizarAseguradora() : crearAseguradora()">
        <div class="user-info">
          <div class="foto-container" @click="triggerFileInput">
            <img v-if="nuevaAseguradora.foto" :src="nuevaAseguradora.foto" alt="Foto de perfil" class="foto-preview">
            <img v-else :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>
            <div class="overlay">
              <i class="fas fa-edit"></i>
            </div>
          </div>
          <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
        </div>
        
        <!-- Campo de Nombre -->
        <label>Nombre:
          <input
            type="text"
            v-model="nuevaAseguradora.nombre"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateNombre"
            @blur="validateRequired($event, 'Obligatorio. Debe contener letras.')"
          />
        </label>

        <!-- Selección de Especialidades -->
        <label>Especialidad:
          <select v-model="especialidadTemp" @change="obtenerPrestaciones">
            <option disabled value="">Seleccione una especialidad</option>
            <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad._id">
              {{ especialidad.nombre }}
            </option>
          </select>
        </label>

        <!-- Selección de Prestaciones con Tarifas -->
        <div v-if="prestaciones.length > 0">
          <label>Prestaciones:
            <select v-model="prestacionTemp.id">
              <option disabled value="">Seleccione una prestación</option>
              <option v-for="prestacion in prestaciones" :key="prestacion._id" :value="prestacion._id">
                {{ prestacion.nombre }}
              </option>
            </select>
          </label>

          <!-- Campo de Tarifa, visible solo si hay una prestación seleccionada -->
          <div v-if="prestacionTemp.id">
            <label>Tarifa (€):
              <input
                type="number"
                v-model="prestacionTemp.tarifa"
                placeholder="Tarifa (€)"
                required
                min="0"
              />
            </label>
            <button @click.prevent="agregarPrestacion" class="boton-agregar">Añadir</button>
          </div>
        </div>

        <!-- Lista de Prestaciones Añadidas con Tarifas -->
        <ul>
          <li v-for="(cobertura, index) in nuevaAseguradora.cobertura" :key="index">
            {{ obtenerNombreEspecialidad(cobertura.especialidad) }}:
            {{ obtenerNombrePrestacion(cobertura.prestacion) }} -
            <strong>{{ cobertura.tarifa }} €</strong>
            <button @click.prevent="eliminarPrestacion(index)" class="boton-crear" style="background-color: var(--color-rojo);">Eliminar</button>
          </li>
        </ul>

        <!-- Botones de acción -->
        <button class="boton-crear" type="submit" v-if="!editarAseguradoraId">
          Crear Aseguradora
        </button>
        <button class="boton-crear" type="button" v-if="editarAseguradoraId" @click="actualizarAseguradora">
          Guardar Cambios
        </button>
        <button class="boton-crear" type="button" v-if="editarAseguradoraId" @click="cancelarEdicion" style="background-color: var(--color-rojo);">
          Cancelar
        </button>
      </form>
    </div>

    <!-- Columna derecha: Lista de aseguradoras -->
    <div class="columna-lista">
      <div class="alinear-elementos">
            <div class="circle">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="var(--primary-color)" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z" fill="var(--primary-color)"/>
              </svg>
            </div>
            <h2 style="color: var(--primary-color);">Listado de Aseguradoras</h2>
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

      <div v-if="!cargando && !errorServidor && aseguradoras.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>

      <!-- Tabla de aseguradoras -->
      <table class="department-table" v-if="aseguradoras.length !== 0">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Prestaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aseguradora in aseguradoras" :key="aseguradora._id">
            <td class="department-actions">

  <!-- Modificar Aseguradora -->
  <button class="boton-crear" style="background-color: #e7c9b2; padding: 5px 25px;" @click="cargarAseguradora(aseguradora)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
    </svg>
  </button>

<!-- Eliminar Aseguradora -->
  <button class="boton-crear" style="background-color: var(--color-rojo); padding: 5px 25px;" @click="confirmarEliminacion(aseguradora._id)">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
  </svg>
  </button>
            </td>
            <td>{{ aseguradora.nombre }}</td>
            <td>
              <ul>
                <li v-for="(cobertura, coberturaIndex) in aseguradora.cobertura" :key="coberturaIndex">
                  {{ cobertura.prestacion.nombre }} ({{ cobertura.especialidad.nombre }}): {{ cobertura.tarifa }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div></div>
</template>
  
  <script>
  import apiClient from '@/apiClient';
  
  export default {
    name: 'GestionAseguradoras',
    data() {
      return {
        especialidad:'',
        prestacion:'',

        aseguradoras: [],
        especialidades: [],
        prestaciones: [],
        nuevaAseguradora: {
          foto: '',
          nombre: '',
          cobertura: [], // Contendrá especialidades, prestaciones y tarifas
        },
        especialidadTemp: '',
        fotoPreview: require('@/assets/estados/perfil_defecto.png'),
        prestacionTemp: { id: '', tarifa: '' },
        editarAseguradoraId: null,
        cargando: false,
        errorServidor: false,
      };
    },
    methods: {
        validateRequired(event, message) {
            event.target.setCustomValidity(''); // Resetea el mensaje personalizado
            if (!event.target.value) {
            event.target.setCustomValidity(message || 'Este campo es obligatorio');
            }
        },
      async obtenerAseguradoras() {
        this.cargando = true;
        try {
          const response = await apiClient.get('/api/aseguradoras');
          this.aseguradoras = response.data;
        } catch (error) {
          console.error('Error al obtener aseguradoras:', error);
          this.errorServidor = true;
        } finally {
          this.cargando = false;
        }
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      async onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = e => {
            this.nuevaAseguradora.foto = e.target.result;
          };
          reader.readAsDataURL(file);
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
      async obtenerPrestaciones() {
        try {
 
            if (this.especialidadTemp) {
                console.log(`especialidadtemp:`, this.especialidadTemp);

                const departamentoResponse = await apiClient.get(`/api/departamentos/${this.especialidadTemp}`);
                const departamento = departamentoResponse.data;

                // Asegúrate de que las prestaciones existan y sean válidas
                this.prestaciones = Array.isArray(departamento.prestaciones)
                ? departamento.prestaciones
                : [];
                console.log(`prestaciones:`, this.prestaciones);

            } else {
              this.prestaciones = [];
            }
        
        } catch (error) {
          console.error('Error al obtener prestaciones:', error);
        }
      },
      agregarEspecialidad() {
        if (
          this.especialidadTemp &&
          !this.nuevaAseguradora.cobertura.some((c) => c.especialidad === this.especialidadTemp)
        ) {
          this.nuevaAseguradora.cobertura.push({ especialidad: this.especialidadTemp });
          this.especialidadTemp = '';
        }
      },
      eliminarEspecialidad(index) {
        this.nuevaAseguradora.cobertura.splice(index, 1);
      },
      agregarPrestacion() {
        if (
          this.prestacionTemp.id &&
          !this.nuevaAseguradora.cobertura.some((c) => c.prestacion === this.prestacionTemp.id)
        ) {
          this.nuevaAseguradora.cobertura.push({
            especialidad: this.especialidadTemp,
            prestacion: this.prestacionTemp.id,
            tarifa: this.prestacionTemp.tarifa,
          });
          this.prestacionTemp = { id: '', tarifa: '' };
          // this.especialidadTemp = '';
        }
      },
      eliminarPrestacion(index) {
        this.nuevaAseguradora.cobertura.splice(index, 1);
      },
      obtenerNombreEspecialidad(id) {
        if (id.nombre) {
          return id.nombre;
        } else {
          const especialidad = this.especialidades.find((e) => e._id === id);
          return especialidad ? especialidad.nombre : '';
        }  
      },
      obtenerNombrePrestacion(id) {
        if (id.nombre) {
          return id.nombre;
        } else {
          const prestacion = this.prestaciones.find((p) => p._id === id);
          return prestacion ? prestacion.nombre : '';
        }
      },
      async crearAseguradora() {
        try {
          await apiClient.post('/api/aseguradoras', this.nuevaAseguradora);
          this.obtenerAseguradoras();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al crear aseguradora:', error);
        }
      },
      cargarAseguradora(aseguradora) {
        this.nuevaAseguradora = { ...aseguradora };
        this.editarAseguradoraId = aseguradora._id;
      },
      async actualizarAseguradora() {
        try {
          await apiClient.put(`/api/aseguradoras/${this.editarAseguradoraId}`, this.nuevaAseguradora);
          this.obtenerAseguradoras();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al actualizar aseguradora:', error);
        }
      },
      cancelarEdicion() {
        this.resetFormulario();
      },
      async confirmarEliminacion(id) {
        const confirmacion = window.confirm('¿Está seguro de que desea eliminar esta aseguradora?');
        if (confirmacion) {
          this.eliminarAseguradora(id);
        }
      },
      async eliminarAseguradora(id) {
        try {
          await apiClient.delete(`/api/aseguradoras/${id}`);
          this.obtenerAseguradoras();
        } catch (error) {
          console.error('Error al eliminar aseguradora:', error);
        }
      },
      resetFormulario() {
        this.nuevaAseguradora = { foto: '', nombre: '', cobertura: [] };
        this.editarAseguradoraId = null;
        this.fotoPreview = require('@/assets/estados/perfil_defecto.png');
      },
    },
    mounted() {
      this.obtenerAseguradoras();
      this.obtenerEspecialidades();
      this.obtenerPrestaciones();
    },
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
  .user-info {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .foto-container {
    position: relative;
    cursor: pointer;
  }
  
  .overlay {
    position: absolute;
    top: 10px;
    left: 0;
    width: 120px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .foto-container:hover .overlay {
    opacity: 1;
  }
  /* Columna para el formulario de creación de departamentos */
  .columna-formulario {
    flex: 1;
    max-width: 40%; /* Controla el ancho de la columna del formulario */
  }
  
  /* Columna para la lista de departamentos */
  .columna-lista {
    flex: 2;
    max-width: 60%; /* Controla el ancho de la columna de la lista */
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
  