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


    <div v-if="mostrarError && !esPaciente" class="error-cuadro">
      <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="white">
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
        <label>Paciente:  </label><label v-if="esPaciente"><span> {{ paciente.nombre }} {{ paciente.apellidos }}</span></label>
        <br>
        <br>
  
        <!-- Selector de Especialidad -->
        <label>Especialidad:
          <label v-if="esPaciente">
          <select v-model="selectedEspecialidad" @change="cargarMedicos">
            <option value="">Seleccione una especialidad</option>
            <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad._id">
              {{ especialidad.nombre }}
            </option>
          </select></label>
        </label>
        <br>
        <br>
  
        <!-- Selector de Médico -->
        <label>Médico:
          <label v-if="esPaciente">
          <select v-model="selectedMedico" @change="cargarCitasDisponibles">
            <option value="">Cualquiera</option>
            <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
              {{ medico.nombre }} {{ medico.apellidos }}
            </option>
          </select></label>
        </label>
        <br>
        <br>
    
        <!-- Mostrar las citas disponibles -->
        <div v-if="esPaciente && citasDisponibles.length > 0">
          <div v-for="(cita, index) in citasDisponibles" :key="index" class="citas-disponibles-item">
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z"/>
              </svg>
              {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}
            </p>  

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
              </svg>
              {{ cita.especialidadId ? cita.especialidadId.nombre : 'No asignada' }}
            </p>

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M480-254 330-104q-23 23-56 23t-56-23L104-218q-23-23-23-56t23-56l150-150-150-150q-23-23-23-56t23-56l114-114q23-23 56-23t56 23l150 150 150-150q23-23 56-23t56 23l114 114q23 23 23 56t-23 56L706-480l150 150q23 23 23 56t-23 56L742-104q-23 23-56 23t-56-23L480-254Zm0-266q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm-170-16 114-114-150-150-114 114 150 150Zm90 96q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm80 80q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm80-80q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520q-17 0-28.5 11.5T520-480q0 17 11.5 28.5T560-440Zm-24 130 150 150 114-114-150-150-114 114ZM339-621Zm282 282Z"/>
              </svg>
             {{ cita.prestacionId ? cita.prestacionId.nombre : 'No asignada' }}
            </p>

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
              </svg>
              {{ formatearFecha(cita.fechaHora) }}
            </p>

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
              </svg>
              {{ formatearHora(cita.fechaHora) }} ({{ cita.duracion }} minutos)
            </p>
            <br>
              <!-- Mostrar el botón de "Reservar cita" solo si hay un paciente y una especialidad seleccionados -->
              <button v-if="selectedEspecialidad"
                @click="reservarCita(cita._id)">
                Reservar cita
              </button>
          </div>
        </div>
  
        <div v-else-if="selectedEspecialidad" class="aviso-cuadro">

          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e15600">
            <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg> 
          <p><strong>En este momento no podemos ofrecerle citas </strong><br>Por favor, inténtalo de nuevo más tarde</p>
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
        <div v-if="citasConsulta.length > 0">
          <div v-for="(cita, index) in citasConsulta" :key="index" class="cita-item">
            
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z"/>
              </svg>
              {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}
            </p>  
            

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
              </svg>
              {{ cita.especialidadId ? cita.especialidadId.nombre : 'No asignada' }}
            </p>

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M480-254 330-104q-23 23-56 23t-56-23L104-218q-23-23-23-56t23-56l150-150-150-150q-23-23-23-56t23-56l114-114q23-23 56-23t56 23l150 150 150-150q23-23 56-23t56 23l114 114q23 23 23 56t-23 56L706-480l150 150q23 23 23 56t-23 56L742-104q-23 23-56 23t-56-23L480-254Zm0-266q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm-170-16 114-114-150-150-114 114 150 150Zm90 96q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm80 80q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm80-80q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520q-17 0-28.5 11.5T520-480q0 17 11.5 28.5T560-440Zm-24 130 150 150 114-114-150-150-114 114ZM339-621Zm282 282Z"/>
              </svg>
             {{ cita.prestacionId ? cita.prestacionId.nombre : 'No asignada' }}
            </p>

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
              </svg>
              {{ formatearFecha(cita.fechaHora) }}
            </p>

            <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
              </svg>
              {{ formatearHora(cita.fechaHora) }} ({{ cita.duracion }} minutos)
            </p>
            <br>

            <p styles="color: black"> {{ cita.pacienteId.nombre }}</p>
            <!-- Botón para cancelar cita -->
            <button @click="confirmarCancelarCita(cita._id)">Cancelar Cita</button>
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
      },
      esPaciente() {
        return this.paciente.tipo === 'Paciente';
      },
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      async datosUsuario() {
        const authStore = useAuthStore();
        await authStore.checkAuth();
        this.paciente = authStore.getUser ? authStore.getUser : 'Usuario';
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

      async obtenerCitasConsulta() {
          try {
            if (this.esPaciente) {
              const response = await apiClient.get('/api/citas', {
                params: {
                  pacienteId: this.paciente._id
                }
              });
              this.citasConsulta = response.data;
          }  
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
      async reservarCita(citaId) {
        try {
          // Validar si tenemos todos los datos necesarios
          if (!citaId) {
            console.error('No se pudo reservar la cita. Faltan datos.');
            return;
          }
  
          // Realizar la petición PUT para reservar la cita
          const response = await apiClient.put(`/api/citas/${citaId}`, {
            pacienteId: this.paciente._id // Se asigna el paciente seleccionado
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
            pacienteId: null 
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
      confirmarCancelarCita(citaId) {
        if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
          this.cancelarCita(citaId);
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
    async mounted() {      
      await this.datosUsuario();      
      this.actualizarHora();
      setInterval(() => {
        this.actualizarHora();
      }, 1000); // Actualiza la hora cada segundo

      this.obtenerEspecialidades();
      this.obtenerCitasConsulta(); 

      setInterval(() => {
        this.obtenerCitasConsulta();
      }, 30000); // Actualiza la hora cada segundo

      // console.log(this.obtenerCitasConsulta); // Verificar si el método está disponible
      
      // Mostrar el mensaje de error después de 10 segundos
      setTimeout(() => {
        this.mostrarError = true;
      }, 1000);
    },
  };
  </script>
  
  
<style scoped>
  .contenedor-principal {
    display: flex;
    justify-content: space-between;
  }
  
  .columna-formulario {
    width: 30%;
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
    background-color: rgb(193, 26, 26);
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
  }


  .cita-item {
    background-color: white; /* Fondo azul */
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: var(--primary-color); /* Texto blanco para mejor contraste */
    border: 3px solid var(--primary-color); /* Ajusta el grosor del borde */

  }

  .cita-item p {
    margin: 5px 0; /* Espaciado entre párrafos */
  }

  .cita-item button {
    background-color: #dc3545; /* Fondo rojo para el botón */
    color: white; /* Texto blanco */
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }

  .cita-item button:hover {
   background-color: #c82333; /* Fondo rojo más oscuro al pasar el ratón */
  }

  .citas-disponibles-item {
    background-color: white; /* Fondo azul */
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: var(--primary-color); /* Texto blanco para mejor contraste */
    border: 3px solid var(--color-azul); /* Ajusta el grosor del borde */
  }

  .citas-disponibles-item p {
    margin: 5px 0; /* Espaciado entre párrafos */
  }

  .citas-disponibles-item button {
    background-color: var(--success-color);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  .citas-disponibles-item button:hover {
    background-color: #22953d;
  }

  .aviso-cuadro {
    background-color: white;
    color: #e15600;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 3px solid #e15600; /* Ajusta el grosor del borde */
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra los elementos horizontalmente */
    justify-content: center; /* Centra los elementos verticalmente */
  }

  .aviso-cuadro p {
    text-align: center; /* Centrar el texto */
  }


  </style>
  