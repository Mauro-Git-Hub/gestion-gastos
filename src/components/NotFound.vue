<template>
  <div>
    <navbar></navbar>
    <h1>Página no encontrada</h1>
    <p>La ruta que has intentado acceder no existe.</p>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  components: { Navbar },
  name: 'NotFound',
};
</script>

<style scoped>
/* Estilos opcionales para tu página de error */
</style>
