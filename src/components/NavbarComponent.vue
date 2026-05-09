<template>
  <nav class="navbar navbar-dark bg-dark px-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Cine Leonelda</a>
      <div class="d-flex align-items-center">
        <span class="text-muted me-3">Hola, Demo</span>
        <button class="btn btn-outline-light btn-sm" @click="$router.push('/login')">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar-brand { font-weight: 700; }
</style>
