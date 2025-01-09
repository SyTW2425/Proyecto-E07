
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
            
            <div v-if="usuario.genero === 'Masculino'">
              
              <div style="display: flex; justify-content: center;">
                <div style="display: flex; justify-content: center; align-items: flex-start; background-color: var(--color-azul2); border-radius: 60px; width: 320px; height: 300px; padding: 0; margin: 0;">
                  <img v-if="usuario.foto" :src="usuario.foto" alt="Foto de perfil" class="foto-preview"/>
                  <img v-else :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>
                </div>
              </div>
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
            <div class="foto-container">
  <img v-if="usuario.foto" :src="usuario.foto" alt="Foto de perfil" class="foto-preview"/>
  <img v-else :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>
</div>
            <div v-if="usuario.genero === 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" style="margin: 1rem;" > Dr. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
            <div v-if="usuario.genero !== 'Masculino'">
              <span class="buttons-text-eq-med-dep" > {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" style="margin: 1rem;"> Dra. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
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
        filtroTipo: "Médico",
        fotoPreview: require('@/assets/estados/perfil_defecto.png'),
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
</style>  <style scoped>
   .foto-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinea el contenido en la parte superior */
  overflow: hidden;
  background-color: var(--color-azul2);
  border-radius: 60px;
  width: 100%;
  height: 60%; /* Mantén la proporción necesaria para el contenedor */
  margin: 0; /* Elimina márgenes */
  padding: 0; /* Elimina relleno interno */
  box-sizing: border-box; /* Asegura que el padding no afecte las dimensiones */
}

.foto-preview {
  width: 100%;
  height: 100%; /* Ajusta la altura al 100% del contenedor */
  object-fit: cover; /* Asegura que la imagen cubra todo el espacio */
  border-radius: 60px;
  margin: 0; /* Elimina márgenes externos */
}

</style>