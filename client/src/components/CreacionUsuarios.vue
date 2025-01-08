<template>
  <div>
    <Header/>
  
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de usuarios -->
    <div class="columna-formulario">
      <div class="alinear-elementos">
            <div class="circle">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 36C6 31.0347 17.9925 28 24 28C30.0075 28 42 31.0347 42 36V42H6V36Z" fill="var(--primary-color)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 26C29.5228 26 34 21.5228 34 16C34 10.4772 29.5228 6 24 6C18.4772 6 14 10.4772 14 16C14 21.5228 18.4772 26 24 26Z" fill="var(--primary-color)"/>
              </svg>

            </div>
            <h2 style="color: var(--primary-color);">Gestión de usuarios</h2>
          </div>
          <br>
      
      <!-- Formulario para crear un usuario -->
      <form @submit.prevent="crearUsuario">
        <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>

        <label>Nombre*:<br>
          <input
            type="text"
            v-model="nuevoUsuario.nombre"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateNombre"
            @blur="validateRequired($event, 'El nombre solo puede contener letras.')"
            @invalid="setCustomMessage($event, 'El nombre solo puede contener letras.')"
          />
        </label>
        <label>Apellidos*:
          <input
            type="text"
            v-model="nuevoUsuario.apellidos"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateApellidos"
            @blur="validateRequired($event, 'Los apellidos solo pueden contener letras.')"
            @invalid="setCustomMessage($event, 'Los apellidos solo pueden contener letras.')"
          />
        </label>

        <label>Contraseña*:
          <input
            type="password"
            v-model="nuevoUsuario.password"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
            @input="handlePasswordChange"
            @blur="validateRequired($event, 'Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.')"
            @invalid="setCustomMessage($event, 'Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.')"
          />
        </label>

        <label>Tipo*:
          <select v-model="nuevoUsuario.tipo" @change="actualizarOpcionesDepartamento" required>
            <option value="" disabled selected>Seleccione tipo</option>
            <option value="Administración">Administración</option>
            <option value="Paciente">Paciente</option>
            <option value="Médico">Médico</option>
            <option value="Gerencia">Gerencia</option>
          </select>
        </label>

        <!-- Campo de Departamento (solo se muestra si corresponde) -->
        <label v-if="departamentosDisponibles.length > 0"> Departamento:
          <select v-model="nuevoUsuario.departamento" required>
            <option v-for="dep in departamentosDisponibles" :key="dep._id" :value="dep._id">{{ dep.nombre }}</option>
          </select>
        </label>

        <!-- Campos opcionales -->
        <label>DNI:
          <input
            type="text"
            v-model="nuevoUsuario.dni"
            pattern="^\d{8}[A-Za-z]$"
            @input="validateDni"
            @blur="validateDni"
            @invalid="setCustomMessage($event, 'El DNI debe tener 8 números seguidos de una letra.')"
          />
        </label>
        <label>Fecha de Nacimiento:
          <input type="date" v-model="nuevoUsuario.fechaNacimiento" />
        </label>
        <label>Género*:
          <select v-model="nuevoUsuario.genero" required>
            <option value="" disabled selected>Seleccione género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </label>
        <label>Dirección:
          <input type="text" v-model="nuevoUsuario.direccion" />
        </label>
        <label>Teléfono:
          <input
            type="text"
            v-model="nuevoUsuario.telefono"
            pattern="^\d{9}$"
            @input="validateTelefono"
            @blur="validateRequired($event, 'El teléfono debe contener exactamente 9 dígitos.')"
            @invalid="setCustomMessage($event, 'El teléfono debe contener exactamente 9 dígitos.')"
          />
        </label>
        <label>Correo Electrónico:
          <input type="email" v-model="nuevoUsuario.email"/>
        </label><br>

        <button class="boton-crear" type="submit" v-if="!editarUsuarioId">
          Crear Usuario
        </button>
        <button class="boton-crear" type="button" v-if="editarUsuarioId" @click="actualizarUsuario">
          Guardar Cambios
        </button>
        <button class="boton-crear" type="button" v-if="editarUsuarioId" @click="cancelarEdicion" style="background-color: var(--color-rojo);">
          Cancelar
        </button>
      </form>
    </div>

    <!-- Columna derecha: Lista de usuarios -->
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
         <h2 style="color: var(--primary-color);">Listado de usuarios</h2>
       </div>
      
      <!-- Filtro para el tipo de usuario -->
      <!-- Filtro para el tipo de usuario -->
      <div class="buscador" style="height: 60px; margin-right: 1px; padding-right: 1px;">
        <label for="filtroTipo">Filtrar por tipo de usuario:</label><br>
        <select v-model="filtroTipo" @change="filtrarUsuarios">
          <option value="">Todos</option>
          <option value="Administración">Administración</option>
          <option value="Paciente">Paciente</option>
          <option value="Médico">Médico</option>
          <option value="Gerencia">Gerencia</option>
        </select>
      </div><br>
      
      <!-- Mensaje de error de comunicación -->
      <v-alert
        v-if="errorServidor"
        type="error"
        class="alerta-error"
        prominent
        color="red lighten-3"
      >
      <span class="alert-text">Fallo de comunicación con el servidor</span>
      </v-alert>

      <!-- Indicador de carga -->
      <div v-if="cargando && !errorServidor" class="text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#17195e"
          indeterminate
        ></v-progress-circular>
      </div>

      <!-- Mensaje de lista vacía -->
      <div v-if="!cargando && !errorServidor && usuariosFiltrados.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>

      <!-- Tabla de usuarios -->
      <table v-if="!cargando && !errorServidor && usuariosFiltrados.length > 0" class="user-table">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Username</th>
            <th>Tipo de usuario</th>
            <th>Departamento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosFiltrados" :key="usuario._id">

            <td class="user-actions">

            <!-- Modificar Usuario -->
              <button class="boton-crear" style="background-color: #e7c9b2; padding: 5px 25px;" @click="cargarUsuario(usuario)">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                </svg>
              </button>

            <!-- Eliminar Usuario -->
              <button class="boton-crear" style="background-color: var(--color-rojo); padding: 5px 25px;" @click="confirmarEliminacion(usuario._id, usuario.nombre)">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
              </button>
            </td>


            <td>{{ usuario.nombre }} {{ usuario.apellidos }}</td>
            <td>{{ usuario.username }}</td>
            <td>{{ usuario.tipo }}</td>
            <td>{{ obtenerNombreDepartamento(usuario.departamento) }}</td>
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
  name: 'CreacionUsuarios',
  components: {
    Header,
  },
  data() {
    return {
      filtroTipo: '',
      usuarios: [],
      nuevoUsuario: {
        nombre: '',
        apellidos: '',
        username: '',
        password: '',
        tipo: '',
        departamento: '',
        dni: '',
        fechaNacimiento: '',
        genero: '',
        direccion: '',
        telefono: '',
        email: ''
      },
      fotoPreview: require('@/assets/estados/perfil_defecto.png'),
      departamentosDisponibles: [],
      todosDepartamentos: [], // Todos los departamentos cargados una vez
      cargando: false, // Estado de carga
      errorServidor: false, // Estado de error
      passwordChanged: false, // Nueva propiedad para rastrear cambios en la contraseña
    };
  },
  computed: {
    usuariosFiltrados() {
      if (this.filtroTipo) {
        return this.usuarios.filter(usuario => usuario.tipo === this.filtroTipo);
      }
      return this.usuarios;
    },
  },
  methods: {
    async obtenerUsuarios() {
      this.cargando = true;
      this.errorServidor = false;
      try {
        const response = await apiClient.get('/api/usuarios');
        this.usuarios = response.data;
        
        // Llama a obtenerDepartamentos() cada vez que se actualizan los usuarios
        await this.obtenerDepartamentos();
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },

    async obtenerDepartamentos() {
      try {
        const response = await apiClient.get('/api/departamentos');
        this.todosDepartamentos = response.data; // Guardar todos los departamentos
        console.log("Departamentos cargados:", this.todosDepartamentos);
        this.actualizarOpcionesDepartamento(); // Aplicar filtro inicial
      } catch (error) {
        console.error('Error al obtener departamentos:', error);
      }
    },
    obtenerNombreDepartamento(departamentoId) {
      const departamento = this.todosDepartamentos.find(dep => dep._id === departamentoId);
      return departamento ? departamento.nombre : '';
    },
    filtrarUsuarios() {
      // Este método se llama cuando se cambia el filtro, pero el cálculo se realiza en `usuariosFiltrados`
    },
    async actualizarOpcionesDepartamento() {
      if (this.nuevoUsuario.tipo === 'Médico') {
        // Filtrar solo departamentos de "Especialidad médica" para el tipo "Médico"
        this.departamentosDisponibles = this.todosDepartamentos.filter(
          dep => dep.tipo === 'Especialidad médica'
        );
      } else if (this.nuevoUsuario.tipo === 'Administración') {
        // Filtrar solo departamentos de "Administración" para el tipo "Administración"
        this.departamentosDisponibles = this.todosDepartamentos.filter(
          dep => dep.tipo === 'Administración'
        );
      } else {
        // Si el tipo es otro (por ejemplo, "Paciente"), limpiar las opciones
        this.departamentosDisponibles = [];
        this.nuevoUsuario.departamento = '';
      }

      // Mantener el departamento seleccionado si existe en la lista filtrada
      if (
        this.nuevoUsuario.departamento &&
        !this.departamentosDisponibles.find(dep => dep._id === this.nuevoUsuario.departamento)
      ) {
        this.nuevoUsuario.departamento = '';
      }
    },
    async crearUsuario() {
      const formData = new FormData();
      formData.append('nombre', this.nuevoUsuario.nombre);
      formData.append('apellidos', this.nuevoUsuario.apellidos);
      formData.append('username', this.nuevoUsuario.username);
      formData.append('password', this.nuevoUsuario.password);
      formData.append('tipo', this.nuevoUsuario.tipo);
      formData.append('departamento', this.nuevoUsuario.departamento);
      formData.append('dni', this.nuevoUsuario.dni);
      formData.append('fechaNacimiento', this.nuevoUsuario.fechaNacimiento);
      formData.append('genero', this.nuevoUsuario.genero);
      formData.append('direccion', this.nuevoUsuario.direccion);
      formData.append('telefono', this.nuevoUsuario.telefono);
      formData.append('email', this.nuevoUsuario.email);

      // Revisa los valores en formData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {
        await apiClient.post('/api/usuarios', formData);
        this.obtenerUsuarios();
        this.resetFormulario();
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    },
    resetFormulario() {
      this.nuevoUsuario = {
        nombre: '',
        apellidos: '',
        username: '',
        password: '',
        tipo: '',
        departamento: '',
        dni: '',
        fechaNacimiento: '',
        genero: '',
        direccion: '',
        telefono: '',
        email: ''
      };
      this.fotoPreview = require('@/assets/estados/perfil_defecto.png');
      this.editarUsuarioId = null; // Salir del modo de edición
      this.passwordChanged = false; // Restablecer el indicador de cambio de contraseña
    }, 
    cargarUsuario(usuario) {
      this.nuevoUsuario = { ...usuario };
      this.editarUsuarioId = usuario._id;
      this.actualizarOpcionesDepartamento(); 
    },
    confirmarEliminacion(id, nombre) {
      const confirmacion = window.confirm(`¿Está seguro de que desea eliminar el usuario ${nombre}?`);
      if (confirmacion) {
        this.eliminarUsuario(id);
      }
    },
    async eliminarUsuario(id) {
      try {
        await apiClient.delete(`/api/usuarios/${id}`);
        this.obtenerUsuarios();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    },
    async actualizarUsuario() {
      // Crear una copia del objeto nuevoUsuario
      const usuarioActualizado = { ...this.nuevoUsuario };
      console.log("Actualizando usuario:", usuarioActualizado);

      // Solo incluir la contraseña si ha sido modificada
      if (!this.passwordChanged || !usuarioActualizado.password.trim()) {
        delete usuarioActualizado.password;
      }

      try {
        await apiClient.put(`/api/usuarios/${this.editarUsuarioId}`, usuarioActualizado, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await this.obtenerUsuarios(); // Recargar la lista de usuarios
        this.resetFormulario(); // Resetear el formulario después de la edición
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    handlePasswordChange(event) {
      this.passwordChanged = true;
      this.nuevoUsuario.password = event.target.value;
    },
    setCustomMessage(event, message) {
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else {
        event.target.setCustomValidity(message);
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
    validateNombre(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('El nombre solo puede contener letras.');
      }
    },
    validateApellidos(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('Los apellidos solo pueden contener letras.');
      }
    },
    validatePassword(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.');
      }
    },
    validateDni(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('El DNI debe tener 8 números seguidos de una letra.');
      }
    },
    validateTelefono(event) {
      event.target.setCustomValidity('');
      if (!event.target.checkValidity()) {
        event.target.setCustomValidity('El teléfono debe contener exactamente 9 dígitos.');
      }
    },
  },
  mounted() {
    this.obtenerUsuarios();
    this.intervalId = setInterval(() => {
      this.obtenerUsuarios();
    }, 60000);
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
  padding: 30px;
}

/* Columna para el formulario de creación de usuarios */
.columna-formulario {
  width: 30%;
}

/* Columna para la lista de usuarios */
.columna-lista {
  width: 65%;
}

/* Estilos del formulario y su contenedor */
.creacion-usuarios {
  text-align: center;
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

    

/* Estilos para botones */
.boton-modificar {
  background-color: var(--warning-color) !important; /* Naranja */
  color: white !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.boton-eliminar {
  background-color: var(--error-color) !important; /* Rojo */
  color: white !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.boton-guardar {
  background-color: var(--success-color) !important; /* Verde */
  color: white !important;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
}

.boton-cancelar {
  background-color: var(--color-gris) !important; /* Gris */
  color: black !important;
  padding: 10px 20px;
  border-radius: 20px;
}

/* Estilos de la lista de usuarios */
.user-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--background-color);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombras suaves */
}

.user-actions {
  width: auto; /* Ajusta el ancho según el contenido */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}


.user-info {
  display: flex;
  width: 100%;
}

.user-column {
  padding: 0 10px; /* Espacio entre columnas */
  flex: 1; /* Distribuye el espacio de manera uniforme */
  text-align: left;
}

/* Ajusta el ancho específico para cada columna según necesidad */
.user-column.nombre {
  flex: 2; /* Ocupa un poco más de espacio para nombres largos */
}

.user-column.apellidos {
  flex: 2;
}

.user-column.username {
  flex: 1;
}

.user-column.tipo {
  flex: 1;
}

/* Estilo para la cabecera de la lista de usuarios */
.user-list-header {
  display: flex;
  padding: 8px 0;
  font-weight: bold;
  color: var(--primary-color); /* Azul corporativo */
  border-bottom: 2px solid var(--color-gris); /* Línea separadora */
  margin-bottom: 10px;
}

.user-list-header .user-column {
  flex: 1;
  padding: 0 10px;
  text-align: left;
}

/* Ajusta el ancho específico para cada columna */
.user-list-header .user-column.nombre {
  flex: 2;
}

.user-list-header .user-column.apellidos {
  flex: 2;
}

.user-list-header .user-column.username {
  flex: 1;
}

.user-list-header .user-column.tipo {
  flex: 1;
}





/* Estilo para los campos de entrada de texto, email y el selector */
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

.filtro-tipo-usuario {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.filtro-tipo-usuario label,
.filtro-tipo-usuario select {
  display: block; /* Hace que el label y el select se comporten como elementos de bloque */
  margin-bottom: 10px; /* Añade un margen inferior para separar los elementos */
}



.alerta-error {
  background-color: #f44336 !important; /* Rojo claro personalizado */
  color: white !important; /* Color de texto */
}

.alert-text {
  margin-left: 20px; /* Ajusta el margen para aumentar la separación */
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

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table tr {
  margin: 0; /* Asegura que no haya espacios adicionales */
  padding: 0;
}

.user-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.user-table td {
  vertical-align: middle;
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
    button {
      background-color: var(--color-verde);
      color: var(--primary-color);
      font-size: 1.1rem;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    .boton-eliminar {
      background-color: var(--color-rojo); /* Fondo rojo para el botón */
      color: white; /* Texto blanco */
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
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



</style>
