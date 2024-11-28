<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet>
          <v-calendar color="primary"></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
    <v-app>
      <v-container>
        <h2>Agenda del Médico</h2>
        <v-calendar
          v-model="fechaSeleccionada"
          type="month"
          :events="eventos"
          :event-color="getEventColor"
          @click:date="handleDateClick"
        ></v-calendar>
        <div v-if="detalleDia" class="mt-5">
          <h3>Detalles del día: {{ detalleDia.fecha }}</h3>
          <p v-if="detalleDia.eventos.length > 0">
            Total de eventos: {{ detalleDia.eventos.length }}
          </p>
          <p v-else>No hay eventos para este día.</p>
        </div>
      </v-container>
    </v-app>
  </div>
</template>
  
  <script>
  export default {
    name: 'InicioMedico',
    data() {
      return {
        fechaSeleccionada: new Date().toISOString().split('T')[0], // Fecha seleccionada
        eventos: [
          {
            name: 'Consulta (15 min)',
            start: new Date().toISOString().split('T')[0],
            type: 'Consulta',
          },
          {
            name: 'Intervención',
            start: new Date().toISOString().split('T')[0],
            type: 'Intervención',
          },
        ], // Eventos de ejemplo
        detalleDia: null, // Detalle del día seleccionado
      };
    },
    methods: {
      getEventColor(evento) {
        return evento.type === 'Consulta' ? 'blue' : 'orange';
      },
      handleDateClick({ date }) {
        const fecha = date.toISOString().split('T')[0];
        const eventosDelDia = this.eventos.filter(
          (evento) => evento.start === fecha
        );
        this.detalleDia = {
          fecha,
          eventos: eventosDelDia,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .mt-5 {
    margin-top: 2rem;
  }
  </style>
  