<template>
  <aside class="bg-dark text-light p-3 sidebar h-100">
    <div class="small text-uppercase text-white-50 mb-3">Menú</div>
    <ul class="nav flex-column gap-1">
      <li class="nav-item">
        <router-link class="nav-link text-light rounded px-3 py-2" to="/dashboard/peliculas">Películas</router-link>
      </li>
      <li v-if="role === 'admin'" class="nav-item">
        <router-link class="nav-link text-light rounded px-3 py-2" to="/dashboard/reservas">Reservas</router-link>
      </li>
    </ul>
    <div class="mt-4 pt-3 border-top border-secondary small text-white-50">
      {{ currentUser?.role === 'admin' ? 'Panel administrador' : 'Panel cliente' }}
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const currentUser = computed(() => JSON.parse(localStorage.getItem('current_user') || 'null'))
const role = computed(() => currentUser.value?.role || 'client')
</script>

<style scoped>
.sidebar { min-width: 220px; border-radius: 0.75rem; }
.nav-link { text-decoration: none; transition: background-color 0.2s ease; }
.router-link-active { background: rgba(255, 255, 255, 0.08); }
</style>
