<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/dashboard/peliculas">Cine Leonelda</router-link>
      <div class="ms-auto d-flex align-items-center gap-3">
        <span class="text-white-50 small d-none d-sm-inline">{{ currentUser?.name || currentUser?.username || 'Invitado' }}</span>
        <span class="badge text-bg-secondary text-uppercase">{{ role }}</span>
        <button class="btn btn-outline-light btn-sm" @click="logout">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = computed(() => JSON.parse(localStorage.getItem('current_user') || 'null'))
const role = computed(() => currentUser.value?.role || 'client')

function logout() {
  localStorage.removeItem('current_user')
  router.push('/login')
}
</script>

<style scoped>
.navbar-brand { font-weight: 700; }
</style>
