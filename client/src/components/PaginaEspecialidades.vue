
<template>
  <div class="estilo-pagina">
    
  
      <section class="banner-principal" style="width: 100%;">
        <span class="letra-banner">Especialidades</span>
      </section>
      
      <section class="search-bar">
        <div class="search-icon">
            <img :src="require('@/assets/icons/Search-icon.png')" alt="Search-icon" class="Search-icon">
        </div>
        <div class="buscar">
          <input type="text" v-model="search" placeholder="Buscar..."/>
        </div>
      </section>
  
  
      <section class="sections" style="width: 100%;">

        <div class="big-buttons" v-for="departamento in departamentosFiltro" :key="departamento._id">
          <button class="big-button-blue" v-if="departamento.index % 2 !== 0">
            <img src="@/assets/estados/departamento_defecto.png" alt="consultas_externas" class="img-section">
            <span class="buttons-text-esp" >{{ departamento.nombre }}</span>
          </button>

          <button class="big-button-green" v-if="departamento.index % 2 === 0">
            <img src="@/assets/estados/departamento_defecto.png" alt="urgencias" class="img-section">
            <span class="buttons-text-esp">{{ departamento.nombre }}</span>
          </button>
        </div>

      </section>


  </div>
</template>

<style src="@/assets/styles.css"></style>

<script>
import apiClient from '@/apiClient';
export default {
  name: 'PaginaEspecialidades',
  data() {
    return {
      search: '',
      departamentos: [],
      filtroTipo: "Especialidad médica",
      index: [],
      cargando: false,
      errorServidor: false
    };
  },
  computed: {
    departamentosID() {
      if (this.filtroTipo) {
        return this.departamentos.filter(departamento => departamento.tipo === this.filtroTipo);
      }
      return this.departamentos;
    },
    departamentosFiltro() {
      if (this.search.trim() === '') {
        return this.departamentosID;
      }
      return this.departamentosID.filter(departamento => 
        departamento.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      );
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
    }
  },
  watch: {
    departamentosID(newDepartamentos) {
      newDepartamentos.forEach((departamento, index) => {
        departamento.index = index + 1;
      });
    }
  },
  
  mounted() {
      this.obtenerDepartamentos();
      this.intervalId = setInterval(() => {
          this.obtenerDepartamentos();
      }, 10000); // Cada 10 segundos
  },
};
</script>
  
<style>
.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
}
</style>