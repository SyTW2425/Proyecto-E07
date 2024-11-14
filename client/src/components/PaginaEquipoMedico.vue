
<template>
    <div class="equipo_medico">
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

        <div class="big-buttons">
          <button class="big-button-blue">
            <img src="@/assets/doctors/Dr_Acoran_Garcia_Suarez.png" alt="Dr_Acoran_Garcia_Suarez" class="img-section">

            <span class="buttons-text-eq-med-dep">Dermatología</span>
            <br>
            <span class="buttons-text-eq-med">Dr. Acorán García Suárez</span>
          </button>

          <button class="big-button-green">
            <img src="@/assets/doctors/Dra_Haria_Benitez_Perez.png" alt="Dra_Haria_Benitez_Perez" class="img-section">

            <span class="buttons-text-eq-med-dep">Oncología</span>
            <br>
            <span class="buttons-text-eq-med">Dra. Haría Benítez Pérez</span>
          </button>

          <button class="big-button-blue">
            <img src="@/assets/doctors/Dr_Nauzet_Morales_Perez.png" alt="Dr_Nauzet_Morales_Perez" class="img-section">

            <span class="buttons-text-eq-med-dep">Ginecología y Obstetricia</span>
            <br>
            <span class="buttons-text-eq-med">Dr. Nauzet Morales Perez</span>
          </button>

          <button class="big-button-green" href="#">
            <img src="@/assets/doctors/Dra_Guacimara_Suarez_Benitez.png" alt="Dra_Guacimara_Suarez_Benitez" class="img-section">

            <span class="buttons-text-eq-med-dep">Reumatología</span>
            <br>
            <span class="buttons-text-eq-med">Dra. Guacimara Suárez Benítez</span>
          </button>

          <button class="big-button-blue">
            <img src="@/assets/doctors/Dra_Magali_Medina_Dominguez.png" alt="Dra_Magali_Medina_Dominguez" class="img-section">

            <span class="buttons-text-eq-med-dep">Neumología</span>
            <br>
            <span class="buttons-text-eq-med">Dra. Magalí Medina Domínguez</span>
          </button>

          <button class="big-button-green">
            <img src="@/assets/doctors/Dr_Ancor_Cabrera_Medina.png" alt="Dr_Ancor_Cabrera_Medina" class="img-section">

            <span class="buttons-text-eq-med-dep">Cirugía General</span>
            <br>
            <span class="buttons-text-eq-med">Dr. Ancor Cabrera Medina</span>
          </button>

          <button class="big-button-blue">
            <img src="@/assets/doctors/Dra_Yaiza_Quintana_Martin.png" alt="Dra_Yaiza_Quintana_Martin" class="img-section">

            <span class="buttons-text-eq-med-dep">Medicina Interna</span>
            <br>
            <span class="buttons-text-eq-med">Dra. Yaiza Quintana Martín</span>
          </button>

          <button class="big-button-green" href="#">
            <img src="@/assets/doctors/Dr_Echedey_Dominguez_Ramos.png" alt="Dr_Echedey_Dominguez_Ramos" class="img-section">

            <span class="buttons-text-eq-med-dep">Odontología</span>
            <br>
            <span class="buttons-text-eq-med">Dr. Echedey Domínguez Ramos</span>
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
    name: "PaginaEquipoMedico",
  };
  </script>
    
    
  