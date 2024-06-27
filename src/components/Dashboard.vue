<template>
  <div>
    <Navbar />
    <!-- Navbar component -->
    <div class="dashboard-content">
      <h2>Total de gastos: {{ saldoTotal }}</h2>
      <div class="dashboard-content-element">
        <gastos-list></gastos-list>
        <!-- GastosList component -->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
// import GastosForm from './GastosForm.vue';
import GastosList from './GastosList.vue';
import { getDatabase, ref, onValue } from 'firebase/database';

export default {
  components: {
    Navbar,
    // GastosForm,
    GastosList,
  },
  data() {
    return {
      saldoTotal: 0,
    };
  },
  created() {
    const db = getDatabase();
    const gastosRef = ref(db, 'gastos');

    onValue(gastosRef, (snapshot) => {
      const gastos = snapshot.val() || {};
      let total = 0;

      Object.values(gastos).forEach((gasto) => {
        total += parseFloat(gasto.cantidad);
      });

      this.saldoTotal = total;
    });
  },
};
</script>

<style scoped>
.dashboard-content {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.dashboard-content-element {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20 5px;
}
.dashboard-content h2 {
  color: #333;
  margin-bottom: 20px;
}
</style>
