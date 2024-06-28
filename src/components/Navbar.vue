<template>
  <nav class="navbar">
    <div class="logo">
      <img src="../assets/logo-gasto.png" alt="logo-gasto" />
    </div>
    <div class="navbar-content">
      <router-link to="/dashboard" class="nav-item">Inicio</router-link>
      <router-link to="/carga" class="nav-item">Cargar</router-link>
      <router-link to="/categoria" class="nav-item"
        >Listar por Categoría</router-link
      >
      <router-link to="/fecha" class="nav-item">Listar por Fecha</router-link>
      <span class="user-email">Usuario: {{ userEmail }}</span>
      <button @click="cerrarSesion" class="btn btn-logout">
        Cerrar Sesión
      </button>
    </div>
  </nav>
</template>

<script>
import { auth } from '../firebase';

export default {
  data() {
    return {
      userEmail: '',
    };
  },
  created() {
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
  background-color: white;
  border-radius: 0.5rem;
  margin-left: 1rem;
}
.logo img {
  object-fit: cover;
  width: 100%;
  color: #f6eeee;
  height: 100%;
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
.nav-item {
  margin-right: 15px;
  color: #fff;
  text-decoration: none;
}
.nav-item:hover {
  text-decoration: underline;
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
</style>
