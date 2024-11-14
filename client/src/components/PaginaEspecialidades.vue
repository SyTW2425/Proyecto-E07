
<template>
  <div class="especialidades">
    <header class="header">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid" >
          <!-- Logotipo -->
          <a class="navbar-brand" href="/">
            <img :src="require('@/assets/logo.png')" alt="Logo" class="logo">
          </a>
          
          <!-- Botón para colapsar menú en pantallas pequeñas -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <!-- Menú de navegación -->
          <div class="collapse navbar-collapse" id="navbarNavDropdown" style="font-size: x-large;">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" style="color: #17195e;">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #17195e;">Especialidades</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #17195e;">Equipo Médico</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #17195e;">Eventos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #17195e;">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <div class="banner-principal">
      <span class="letra-especialidades">Especialidades</span>
    </div>
    
    <div class="search-bar">
      <div class="search-icon">
          <img :src="require('@/assets/icons/Search-icon.png')" alt="Search-icon" class="Search-icon">
      </div>
      <div class="buscar">
        <input type="text" v-model="search" placeholder="Buscar..."/>
      </div>
    </div>


    <div class="sections">
      <div class="section-head">
        <span class="section-text">Servicios</span>
        <button class="button-todos">Ver todos</button>
      </div>

      <div class="buttons-servicios">
        <button class="big-button-blue">
          <img src="@/assets/general/consultas_externas.png" alt="" class="img-consultas">
          
          <span class="buttons-text">Consultas Externas</span>
        </button>
        <button class="big-button-green">
          <img src="@/assets/general/urgencias.png" alt="" class="img-consultas">
          
          <span class="buttons-text">Urgencias</span>
        </button>
        <button class="big-button-blue">
          <img src="@/assets/general/radiologia.png" alt="" class="img-consultas">
          
          <span class="buttons-text">Radiología</span>
        </button>
        <button class="big-button-green" href="#">
          <img src="@/assets/general/laboratorio.png" alt="" class="img-consultas">

          <span class="buttons-text">Laboratorio</span>
        </button>
      </div>
    </div>


    <div class="sections">
      <div class="section-head">
        <span class="section-text">Servicios</span>
        <button class="button-todos">Ver todos</button>
      </div>

      <div class="buttons-servicios">
        <button class="big-button-blue">
          <img src="@/assets/general/consultas_externas.png" alt="" class="img-consultas">
          
          <span class="buttons-text">Consultas Externas</span>
        </button>
        <button class="big-button-green">
          <img src="@/assets/general/urgencias.png" alt="" class="img-consultas">
          
          <span class="buttons-text">Urgencias</span>
        </button>
        <button class="big-button-blue">
          <img src="@/assets/general/radiologia.png" alt="" class="img-consultas">
          
          <span class="buttons-text">Radiología</span>
        </button>
        <button class="big-button-green" href="#">
          <img src="@/assets/general/laboratorio.png" alt="" class="img-consultas">

          <span class="buttons-text">Laboratorio</span>
        </button>
      </div>
    </div>

    <!-- Footer (Pie de página) -->
    <footer class="footer">
        <p>Portal del paciente | Intranet | Contacto</p>
        <p>Hospital Rambla - Comprometidos en ofrecer atención sanitaria de primer nivel, con dedicación y calidad humana.</p>
      </footer>


  </div>
</template>

<style src="@/assets/styles.css"></style>

<script>
export default {
  name: "PaginaEspecialidades",
};
</script>
  
  

<style scoped>
.image-container {
  display: flex;             /* Coloca las imágenes en fila */
  justify-content: center;    /* Centra las imágenes en el contenedor */
  align-items: center;        /* Alinea verticalmente en el centro si tienen alturas diferentes */
  gap: 20px;                  /* Espacio entre las imágenes */
  padding: 20px;              /* Añade un padding opcional para espacio interno en el contenedor */
  flex-wrap: wrap;            /* Permite que el contenido se ajuste en varias filas si es necesario */
  width: 100%;                /* Hace que el contenedor ocupe el ancho completo */
  box-sizing: border-box;     /* Asegura que el padding no aumente el ancho total */
}


.same-width-img {
  width: 100px;               /* Ajusta el ancho deseado para todas las imágenes */
  height: auto;               /* Mantiene la proporción de la imagen */
}

.boton {
  background-color: var(--primary-color) !important; 
  color: white !important;
}

.boton-white {
  background-color: white !important;
  color: var(--primary-color) !important;
}


</style>