<template>
  <div class="estilo-pagina">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">Intranet</h1>
    </header>
    <br>

    <div class="stats-container">
    <div class="stat-card" style="background-color: #162d57; color: white;">
      <div class="text-content">
      <p>Número de total de usuarios</p>
      <h2>3,256</h2></div>
      
      <img src="@/assets/icons/icono-usuario.svg" alt="Icono usuarios" class="icon" />
    </div>
    <div class="stat-card" style="background-color: #162d57; color: white;">

      <div class="text-content">
      <p>Número de total de usuarios</p>
      <h2>3,256</h2></div>
      <img src="@/assets/icons/icono-usuario.svg" alt="Icono usuarios" class="icon" />
    </div> 
    <div class="stat-card" style="background-color: #162d57; color: white;">

      <div class="text-content">
      <p>Número de total de usuarios</p>
      <h2>3,256</h2>
      </div>
      <img src="@/assets/icons/icono-usuario.svg" alt="Icono usuarios" class="icon" />
    </div>  
    <div class="stat-card" style="background-color: #162d57; color: white;">

      <div class="text-content">
      <p>Número de total de usuarios</p>
      <h2>3,256</h2>
      </div>
      <img src="@/assets/icons/icono-usuario.svg" alt="Icono usuarios" class="icon" />
    </div>
    </div>






      <section class="info-principal">
        <div class="info-card">
          <p>Número de usuarios</p>
          <h2>3,256</h2>
        </div>
        <div class="info-card">
          <p>Número de pacientes</p>
          <h2>3,006</h2>
        </div>
        <div class="info-card">
          <p>Número de médicos</p>
          <h2>185</h2>
        </div>
        <div class="info-card">
          <p>Número de administrativos</p>
          <h2>65</h2>
        </div>
      </section>
  
      <section class="opciones">
        <div class="opcion-card">Usuarios</div>
        <div class="opcion-card">Finanzas</div>
        <div class="opcion-card">Aseguradoras</div>
        <div class="opcion-card">Encuestas</div>
      </section>
  
      <section class="departamentos">
        <h2>Departamentos</h2>
        <p>Total: <strong>26</strong></p>
        <div class="departamento-info">
          <p>Con más pacientes: <strong>Dermatología</strong></p>
          <p>Con mayor rentabilidad: <strong>Cirugía General</strong></p>
          <p>Con menor rentabilidad: <strong>Obstetricia</strong></p>
        </div>
        <button>Ver todos</button>
      </section>
  
      <section class="aseguradoras">
        <h2>Compañías aseguradoras</h2>
        <p>Total: <strong>7</strong></p>
        <p>Compañía con más pacientes: <strong>Adeslas</strong></p>
      </section>
  
      <section class="satisfaccion">
        <h2>Satisfacción general</h2>
        <p><strong>4.1/5</strong></p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "InicioGerencia",
  };
  </script>
  
  <style scoped>
  
  .header h1 {
    font-size: 24px;
  }
  
  .header span {
    color: #007bff;
  }
  
  .info-principal {
    display: flex;
    gap: 10px;
    margin: 20px 0;
  }
  
  .info-card {
    background: #f4f4f4;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    flex: 1;
  }
  
  .info-card h2 {
    margin: 0;
  }
  
  .opciones {
    display: flex;
    gap: 10px;
  }
  
  .opcion-card {
    flex: 1;
    background: #007bff;
    color: white;
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .departamentos,
  .aseguradoras,
  .satisfaccion {
    margin: 20px 0;
  }
  
  .departamento-info p {
    margin: 5px 0;
  }
  
  button {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 0rem); 
  background-color: #e1e1e1;
  
  padding: 1rem;
  text-align: left;
  display: flex;

  align-items: left;
  justify-content: left;

  gap: 10px;
  border-radius: 15px; 
}


.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
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
  font-size: 24px; 
}
.vertical-line {
  width: 4px;
  height: 70px;
  background-color: #92bdf6; 
}



.stats-container {
  display: flex;
  gap: 15px;
  justify-content: space-between; /* Espacio uniforme entre las tarjetas */
  width: 100%; /* Asegúrate de ocupar el ancho completo del contenedor */
}


.stat-card {
  display: flex;
  flex-direction: row; /* Alinear contenido en fila */
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 20px;
  flex: 1; /* Permitir que cada tarjeta crezca para ocupar el espacio disponible */
  min-width: 0; /* Prevenir problemas de desbordamiento */
  border-radius: 8px;
}

.icon {
  fill: #ffffff; /* Cambia el color al deseado */
  width: 40px;
  height: 40px;
}



.stat-card p,
.stat-card h2 {
  margin: 0;
}

.stat-card .text-content {
  flex: 1; /* Ocupa el espacio restante */
}

.stat-card .icon {
  margin-left: 10px; /* Separar el ícono del texto */
  width: 40px;
  height: 40px;
}


.percentage {
  color: #1ea87a;
  font-size: 12px;
  margin-top: 5px;
}
</style>
  