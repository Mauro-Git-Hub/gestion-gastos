<template>
  <div>
    <Navbar />
    <div class="lista-categoria-container">
      <h2>Lista de Gastos por Categoría</h2>
      <div class="form-group">
        <label for="categoria">Seleccione una categoría</label>
        <select
          v-model="categoriaSeleccionada"
          id="categoria"
          class="form-control"
        >
          <option value="todos">Todos</option>
          <option value="comida">Comida</option>
          <option value="ropa">Ropa</option>
          <option value="salud">Salud</option>
          <option value="vivienda">Vivienda</option>
          <option value="transporte">Transporte</option>
          <option value="educacion">Educación</option>
          <option value="otros">Otros</option>
        </select>
      </div>
      <div v-if="gastosFiltrados.length">
        <h3>
          {{
            categoriaSeleccionada === 'todos'
              ? 'Todos los gastos'
              : categoriaSeleccionada
          }}
        </h3>
        <ul>
          <li v-for="gasto in gastosFiltrados" :key="gasto.id">
            {{ gasto.nombre }} - $ {{ gasto.cantidad }} - {{ gasto.categoria }}
          </li>
        </ul>
      </div>
      <p v-else>No hay gastos para la categoría seleccionada.</p>
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
      categoriaSeleccionada: 'todos',
    };
  },
  computed: {
    gastosFiltrados() {
      if (this.categoriaSeleccionada === 'todos') {
        return Object.values(this.gastos);
      }
      return Object.values(this.gastos).filter(
        (gasto) => gasto.categoria === this.categoriaSeleccionada
      );
    },
  },
  created() {
    const db = getDatabase();
    const gastosRef = ref(db, 'gastos');
    onValue(gastosRef, (snapshot) => {
      this.gastos = snapshot.val() || {};
    });
  },
};
</script>

<style scoped>
.lista-categoria-container {
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
