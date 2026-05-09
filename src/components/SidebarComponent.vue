<template>
  <aside class="bg-dark text-light p-3 sidebar" style="min-width:220px;">
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <router-link class="nav-link text-light" to="/dashboard/peliculas">🎬 Peliculas</router-link>
      </li>
      <li class="nav-item mb-2">
        <a class="nav-link text-light" href="#">👥 Clientes</a>
      </li>
      <li class="nav-item mt-3">
        <small class="text-muted">Version demo • Modular</small>
      </li>
    </ul>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar { height: 100%; border-radius: 8px; }
.nav-link { text-decoration: none }
</style>
