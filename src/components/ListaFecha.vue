<template>
  <div>
    <Navbar />
    <div class="lista-fecha-container">
      <h2>Lista de Gastos por Fecha</h2>
      <div class="form-group">
        <label for="fechaInicio">Fecha de inicio</label>
        <input
          v-model="fechaInicio"
          type="date"
          id="fechaInicio"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="fechaFin">Fecha de fin</label>
        <input
          v-model="fechaFin"
          type="date"
          id="fechaFin"
          class="form-control"
        />
      </div>
      <div v-if="gastosFiltrados.length">
        <h3>
          Gastos desde {{ formatDate(fechaInicio) }} hasta
          {{ formatDate(fechaFin) }}
        </h3>
        <ul>
          <li v-for="gasto in gastosFiltrados" :key="gasto.id">
            {{ gasto.nombre }} - $ {{ gasto.cantidad }} -
            {{ formatDate(gasto.fecha) }}
          </li>
        </ul>
      </div>
      <p v-else>No hay gastos para el rango de fechas seleccionado.</p>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import Navbar from './Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      gastos: {},
      fechaInicio: '',
      fechaFin: '',
    };
  },
  computed: {
    gastosFiltrados() {
      if (!this.fechaInicio || !this.fechaFin) {
        return [];
      }
      const inicio = new Date(this.fechaInicio);
      const fin = new Date(this.fechaFin);
      return Object.values(this.gastos).filter((gasto) => {
        const fechaGasto = new Date(gasto.fecha);
        return fechaGasto >= inicio && fechaGasto <= fin;
      });
    },
  },
  created() {
    const db = getDatabase();
    const gastosRef = ref(db, 'gastos');
    onValue(gastosRef, (snapshot) => {
      const gastosData = snapshot.val() || {};
      this.gastos = Object.values(gastosData).map((gasto) => ({
        ...gasto,
        fecha: gasto.fecha || new Date().toISOString().split('T')[0], // Asegurar que cada gasto tiene una fecha
      }));
    });
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style scoped>
.lista-fecha-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
