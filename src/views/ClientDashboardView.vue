<template>
  <div>
    <nav class="navbar navbar-light bg-light sticky-top" style="border-bottom: 1px solid #e5e7eb;">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold" to="/">
          🎬 Cine Leonelda
        </router-link>
        <div class="d-flex align-items-center gap-3">
          <span class="badge bg-light text-dark">👤 {{ currentUser?.name || 'Cliente' }}</span>
          <button class="btn btn-outline-secondary btn-sm" @click="logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>

    <div class="container-fluid mt-4 pb-5">
      <div class="row g-4">
        <!-- Sidebar Navegación -->
        <div class="col-lg-3">
          <div class="card shadow-sm sticky-top" style="top: 80px;">
            <div class="card-body p-0">
              <div class="list-group list-group-flush">
                <router-link
                  to="/client/movies"
                  class="list-group-item list-group-item-action d-flex align-items-center gap-2"
                  active-class="active"
                >
                  🎬 Ver Películas
                </router-link>
                <router-link
                  to="/client/my-reservations"
                  class="list-group-item list-group-item-action d-flex align-items-center gap-2"
                  active-class="active"
                >
                  🎫 Mis Reservaciones
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenido Principal -->
        <div class="col-lg-9">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref(null)

onMounted(() => {
  const user = sessionStorage.getItem('currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
  } else {
    router.push('/login')
  }
})

function logout() {
  sessionStorage.removeItem('currentUser')
  router.push('/login')
}
</script>

<style scoped>
.list-group-item {
  border: none;
  padding: 1rem;
  transition: all 0.3s ease;
  color: var(--gray-700);
}
.list-group-item:hover {
  background-color: var(--gray-50);
}
.list-group-item.active {
  background-color: var(--primary);
  color: white;
  border-left: 4px solid var(--secondary);
}
</style>
