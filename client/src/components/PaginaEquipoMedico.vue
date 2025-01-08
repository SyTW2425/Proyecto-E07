
<template>
    <div class="estilo-pagina">
      
  
      <section class="banner-principal" style="width: 100%;">
        <span class="letra-chica">Contamos con el mejor</span>
        <span class="letra-banner">Equipo médico</span>
      </section>
      
      <section class="search-bar">
        <div class="search-icon">
            <img :src="require('@/assets/icons/Search-icon.png')" alt="Search-icon" class="Search-icon">
        </div>
        <div class="buscar">
          <input type="text" v-model="search" placeholder="Buscar..."/>
        </div>
      </section>
  
  
      <section class="sections">

        <div class="big-buttons" v-for="usuario in usuariosFiltro" :key="usuario._id">
          <button class="big-button-blue" v-if="usuario.index % 2 !== 0">
            <img src="@/assets/estados/perfil_defecto.png" alt="consultas_externas" class="img-section">
            <div v-if="usuario.genero === 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dr. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
            <div v-if="usuario.genero !== 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dra. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
          </button>

          <button class="big-button-green" v-if="usuario.index % 2 === 0">
            <img src="@/assets/estados/perfil_defecto.png" alt="consultas_externas" class="img-section">
            <div v-if="usuario.genero === 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dr. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
            <div v-if="usuario.genero !== 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dra. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
          </button>
        </div>
      </section>
  

  
  
    </div>
  </template>
  
  <style src="@/assets/styles.css"></style>
  
  <script>
  import apiClient from '@/apiClient';

  export default {
    name: "PaginaEquipoMedico",
    data() {
      return {
        search: '',
        usuarios: [],
        departamentos: [],
        index: [],
        cargando: false,
        errorServidor: false,
        filtroTipo: "Médico"
      };
    },
    computed: {
      usuariosID() {
        if (this.filtroTipo) {
          return this.usuarios.filter(usuario => usuario.tipo === this.filtroTipo);
        }
        return this.usuarios;
      },
      
      usuariosFiltro() {
        if (this.search.trim() === '') {
          return this.usuariosID;
        }
        return this.usuariosID.filter(usuario => 
          usuario.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        );
      },
      
    },

    methods: {
      async obtenerUsuarios() {
        this.cargando = true;
        this.errorServidor = false;
        try {
          const response = await apiClient.get('/api/usuarios');
          this.usuarios = response.data;
        } catch (error) {
          this.errorServidor = true;
        } finally {
          this.cargando = false;
        }
      },
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
      getDepartamentoName(departamentoId) {
        const departamento = this.departamentos.find(dep => dep._id === departamentoId);
        return departamento ? departamento.nombre : 'Unknown';
      }
    },
      
    
    mounted() {
        this.obtenerUsuarios();
        this.obtenerDepartamentos();
        this.intervalId = setInterval(() => {
            this.obtenerUsuarios();
        }, 10000); // Cada 10 segundos
    },

    watch: {
      usuariosID(newUsuarios) {
        newUsuarios.forEach((usuario, index) => {
          usuario.index = index + 1;
        });
      }
    },
  };
  </script>
    
    
<style>
.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
}
</style>  