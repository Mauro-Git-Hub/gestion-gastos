<template>
  <div class="gasto-list-container">
    <!-- <h2>Lista de gastos</h2> -->
  
  <font-awesome-icon icon="fa-solid fa-user-secret" />

    

    <ul>
      <li v-for="gasto in gastos" :key="gasto.id" class="gasto-item">
        <div v-if="editandoGastoID === gasto.id" class="edit-form">
          <!-- Formulario de edición -->
          <div class="form-group">
            <label for="editarNombre">Nombre del Gasto</label>
            <input
              v-model="editarNombre"
              type="text"
              id="editarNombre"
              placeholder="Nombre del Gasto"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="editarCantidad">Cantidad</label>
            <input
              v-model="editarCantidad"
              type="number"
              id="editarCantidad"
              placeholder="Cantidad"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="editarCategoria">Categoría</label>
            <select
              v-model="editarCategoria"
              id="editarCategoria"
              class="form-control"
            >
              <option value="null" disabled>Seleccione una categoría</option>
              <option value="comida">Comida</option>
              <option value="ropa">Ropa</option>
              <option value="salud">Salud</option>
              <option value="vivienda">Vivienda</option>
              <option value="transporte">Transporte</option>
              <option value="educacion">Educación</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div class="button-group">
            <button @click="actualizarGasto(gasto.id)" class="btn btn-success">
              Guardar
            </button>
            <button @click="cancelarEdicion" class="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
        <div v-else class="gasto-info">
          <!-- Mostramos info del gasto -->
          <span class="gasto-name">{{ gasto.nombre }}</span>
          <span class="gasto-amount"> - {{ gasto.cantidad }}</span>
          <div class="button-group">
            <button @click="editarGasto(gasto)" class="btn btn-primary">
              Editar
            </button>
            <button @click="eliminarGasto(gasto.id)" class="btn btn-danger">
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>





import { ref, onValue, remove, update } from 'firebase/database';
import { database, auth } from '../firebase';

export default {
  data() {
    return {
      gastos: [],
      editandoGastoID: null,
      editarNombre: '',
      editarCantidad: '',
      editarCategoria: '',
    };
  },
  created() {
    // Se ejecuta cuando el componente se crea
    const user = auth.currentUser;
    if (user) {
      const gastosRef = ref(database, 'gastos');
      onValue(gastosRef, (snapshot) => {
        const gastos = [];
        snapshot.forEach((childSnapshot) => {
          gastos.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        this.gastos = gastos;
      });
    } else {
      console.log('Nesecitas iniciar sesión para ver tus gastos');
    }
  },
  methods: {
    editarGasto(gasto) {
      this.editandoGastoID = gasto.id;
      this.editarNombre = gasto.nombre;
      this.editarCantidad = gasto.cantidad;
      this.editarCategoria = gasto.categoria;
    },
    cancelarEdicion() {
      this.editandoGastoID = null;
      this.editarNombre = '';
      this.editarCantidad = '';
      this.editarCategoria = '';
    },
    async actualizarGasto(gastoID) {
      try {
        const gastoRef = ref(database, `gastos/${gastoID}`);
        await update(gastoRef, {
          nombre: this.editarNombre,
          cantidad: this.editarCantidad,
          categoria: this.editarCategoria,
        });
        this.cancelarEdicion();
      } catch (error) {
        console.error('Error actualizando el gasto:', error);
      }
    },
    async eliminarGasto(gastoID) {
      try {
        const gastoRef = ref(database, `gastos/${gastoID}`);
        await remove(gastoRef);
      } catch (error) {
        console.error('Error eliminando el gasto:', error);
      }
    },
  },
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-svg-core/styles.css';

*{
	margin: 0;
	padding: 0;
	list-style: none;
	text-decoration: none;
	border: none;
	outline: none;
}
.gasto-list-container {
  font-family: 'Arial', sans-serif;
  flex-grow: 1;
  flex-basis: 50%;
}

.gasto-list-container h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.gasto-item {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  list-style-type: none
}

.edit-form,
.gasto-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.select-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-image: linear-gradient(to bottom, #ffffff, #f2f2f2);
  cursor: pointer;
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}

.gasto-name {
  font-weight: bold;
}

.gasto-amount {
  color: #888;
}
</style>
