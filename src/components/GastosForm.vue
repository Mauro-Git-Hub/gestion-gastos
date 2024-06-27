<template>
  <div class="gasto-form-container">
    <div class="gasto-form-box">
      <!-- Formulario para cargar un gasto -->
      <form @submit.prevent="agregarGasto">
        <div class="form-group">
          <label for="nombre">Nombre del Gasto</label>
          <input
            v-model="nombre"
            type="text"
            id="nombre"
            placeholder="Ingrese un gasto"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="cantidad">Cantidad</label>
          <input
            v-model="cantidad"
            type="number"
            id="cantidad"
            placeholder="Ingrese cantidad"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="categoria">Categoría</label>
          <select v-model="categoria" id="categoria" class="form-control">
            <option value="" disabled selected>Seleccione una categoría</option>
            <option value="comida">Comida</option>
            <option value="ropa">Ropa</option>
            <option value="salud">Salud</option>
            <option value="vivienda">Vivienda</option>
            <option value="transporte">Transporte</option>
            <option value="educacion">Educación</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Agregar gasto</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, push } from 'firebase/database';
import { database, auth } from '../firebase';

export default {
  data() {
    return {
      nombre: '',
      cantidad: '',
      categoria: '',
    };
  },
  methods: {
    async agregarGasto() {
      try {
        // Objeto con los datos del gasto
        const gasto = {
          nombre: this.nombre,
          cantidad: this.cantidad,
          categoria: this.categoria,
          uid: auth.currentUser.uid,
        };
        // Referencia a la base de datos
        const gastosRef = ref(database, 'gastos');
        console.log(gastosRef);
        // Agregar el gasto a la base de datos
        await push(gastosRef, gasto);
        // Limpiar campos después de agregar el gasto
        this.nombre = '';
        this.cantidad = '';
        this.categoria = '';
      } catch (error) {
        console.error('Error agregando el gasto:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para el contenedor del formulario */
.gasto-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
}

.gasto-form-box {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Estilos para el formulario */
.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

select.form-control {
  appearance: none;
  padding-right: 30px; /* Ajuste para flecha de selección */
  background-image: url('data:image/svg+xml;utf8,<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 12l-6-6h12l-6 6z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
box-shadow: 0px 0px 0px 2px #9acc85;
	background:linear-gradient(to bottom, #74ad5a 5%, #68a54b 100%);
	background-color:#74ad5a;
	border-radius:10px;
	border:1px solid #3b6e22;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:19px;
	padding:12px 37px;
	text-decoration:none;
	text-shadow:0px 1px 0px #92b879;
}

.btn:hover {
 	background:linear-gradient(to bottom, #68a54b 5%, #74ad5a 100%);
	background-color:#7cb661;
}
</style>
