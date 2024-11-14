
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
                <a class="nav-link active" aria-current="page" href="/" style="color: #17195e;">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/especialidades" style="color: #17195e;">Especialidades</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/equipo-medico" style="color: #17195e;">Equipo Médico</a>
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

    <section class="banner-principal">
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


    <section class="sections">
      <div class="section-head">
        <span class="section-text">Servicios</span>
        <button class="button-todos">Ver todos</button>
      </div>

      <div class="big-buttons">
        <button class="big-button-blue">
          <img src="@/assets/general/consultas_externas.png" alt="" class="img-section">
          
          <span class="buttons-text-esp">Consultas Externas</span>
        </button>
        <button class="big-button-green">
          <img src="@/assets/general/urgencias.png" alt="" class="img-section">
          
          <span class="buttons-text-esp">Urgencias</span>
        </button>
        <button class="big-button-blue">
          <img src="@/assets/general/radiologia.png" alt="" class="img-section">
          
          <span class="buttons-text-esp">Radiología</span>
        </button>
        <button class="big-button-green" href="#">
          <img src="@/assets/general/laboratorio.png" alt="" class="img-section">

          <span class="buttons-text-esp">Laboratorio</span>
        </button>
      </div>
    </section>


    <section class="sections">
      <div class="section-head">
        <span class="section-text">Departamentos</span>
        <button class="button-todos">Ver todos</button>
      </div>

      <div class="big-buttons">
        <button class="big-button-blue">
          <img src="@/assets/general/medicina_interna.png" alt="" class="img-section">
          
          <span class="buttons-text-esp">Medicina Interna</span>
        </button>
        <button class="big-button-green">
          <img src="@/assets/general/pediatria.png" alt="" class="img-section">
          
          <span class="buttons-text-esp">Pediatria</span>
        </button>
        <button class="big-button-blue">
          <img src="@/assets/general/cirugia_general.png" alt="" class="img-section">
          
          <span class="buttons-text-esp">Cirugia General</span>
        </button>
        <button class="big-button-green" href="#">
          <img src="@/assets/general/cardiologia.png" alt="" class="img-section">

          <span class="buttons-text-esp">Cardiologia</span>
        </button>
      </div>
    </section>

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
  