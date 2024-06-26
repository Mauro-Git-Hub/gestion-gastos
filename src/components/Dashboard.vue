<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
          <img src="../assets/logo-gasto.png" alt="logo-gasto" />
      </div>
      <div class="navbar-content">
        
           <h3 class="user-email">{{ userEmail }}</h3>
      
           <button @click="cerrarSesion" class="btn btn-logout">
          Cerrar Sesión
        </button>
      </div>
    </nav>

    <!-- Contenido del Dashboard -->
    <div class="dashboard-content">
      <h2>Lista de Gastos</h2>
      <div class="dashboard-content-element">
        <gastos-list></gastos-list>
        <gastos-form></gastos-form>

      </div>
    </div>
  </div>
</template>

<script>
import GastosForm from './GastosForm.vue';
import GastosList from './GastosList.vue';
import { auth } from '../firebase';

export default {
  components: {
    GastosForm,
    GastosList,
  },
  data() {
    return {
      userEmail: '',
    };
  },
  // computed: {
  //   userEmail() {
  //     return auth.currentUser ? auth.currentUser.email : '';
  //   },
  // },
  created() {
    // auth.onAuthStateChanged((user) => {
    //   if (!user) {
    //     this.$router.push('/auth');
    //   }
    // });
    const user = auth.currentUser;
    if (user) {
      this.userEmail = user.email;
    }
  },
  methods: {
    async cerrarSesion() {
      try {
        await auth.signOut();
        this.$router.push('/');
      } catch (error) {
        console.error('Error cerrando sesión:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para el Navbar */
*{
  box-sizing: border-box;
}

.navbar {
  background-color: #057645;
  padding: 10px 0;
  display: flex;
  max-height: 80px;
}
.logo {
  width: 10%;
  max-width: 4rem;
  height: 100%;
  background-color:white ;
  border-radius: 0.5rem;
  margin-left: 1rem;
  }
.logo img{
  object-fit: cover;
  width:100%;
  color: #f6eeee;
  height:100%;
  max-height: 47px;
  max-width: 35px;

}
.navbar-content {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #fff;
}



.user-email {
  font-weight: bold;
}

.btn {
  padding: 8px 16px;
  font-size: 1rem;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn:hover {
  background-color: #fff;
  color: #007bff;
}

.btn-logout {
  margin-left: 10px;
}

/* Estilos para el contenido del Dashboard */
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
padding: 20
5px;
}

.dashboard-content h2 {
  color: #333;
  margin-bottom: 20px;
}
</style>
