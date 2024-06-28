<template>
  <div class="auth-container">
    <div class="auth-box">
      <!-- Formulario Iniciar Sesión -->
      <h2 class="auth-title">
        {{ estaRegistrado ? 'Inicia sesión' : 'Regístrate' }}
      </h2>
      <form @submit.prevent="estaRegistrado ? login() : registrar()">
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            placeholder="Ingrese su email"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="******"
            required
            class="form-control"
            autocomplete="off"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          {{ estaRegistrado ? 'Inicia sesión' : 'Regístrate' }}
        </button>
      </form>
      <p class="auth-switch">
        {{
          estaRegistrado ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'
        }}
        <a @click="cambiarFormulario">{{
          estaRegistrado ? 'Regístrate' : 'Inicia sesión'
        }}</a>
      </p>
      <p v-if="errorRegistro" class="auth-error">{{ errorRegistro }}</p>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export default {
  data() {
    return {
      estaRegistrado: true,
      email: '',
      password: '',
      errorRegistro: '',
    };
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
        this.errorRegistro =
          'Credenciales inválidas. Por favor, inténtalo de nuevo.';
      }
    },
    async registrar() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error registering:', error);
        this.errorRegistro = error.message;
      }
    },
    cambiarFormulario() {
      this.estaRegistrado = !this.estaRegistrado;
      this.errorRegistro = null;
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.auth-box {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.auth-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: calc(100% - 22px);
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #057645;
}

.btn-primary:hover {
  background-color: #14ad6b;
}

.auth-switch {
  text-align: center;
  margin-top: 10px;
}

.auth-switch a {
  cursor: pointer;
  color: #007bff;
}

.auth-switch a:hover {
  text-decoration: underline;
}

.auth-error {
  color: #dc3545;
  margin-top: 10px;
}
</style>
