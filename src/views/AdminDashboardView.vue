<template>
  <div>
    <nav class="navbar navbar-dark sticky-top" style="background: var(--gray-800); border-bottom: 1px solid var(--gray-700);">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold text-white" to="/">
          🎬 Cine Leonelda - ADMIN
        </router-link>
        <div class="d-flex align-items-center gap-3">
          <span class="badge bg-secondary">⚙️ {{ currentUser?.name || 'Admin' }}</span>
          <button class="btn btn-outline-light btn-sm" @click="logout">
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
            <div class="card-header" style="background: var(--gray-100);">
              <h6 class="mb-0">⚙️ PANEL DE ADMINISTRACIÓN</h6>
            </div>
            <div class="card-body p-0">
              <div class="list-group list-group-flush">
                <router-link
                  to="/admin/movies"
                  class="list-group-item list-group-item-action d-flex align-items-center gap-2"
                  active-class="active"
                >
                  🎬 Películas
                </router-link>
                <router-link
                  to="/admin/showtimes"
                  class="list-group-item list-group-item-action d-flex align-items-center gap-2"
                  active-class="active"
                >
                  ⏰ Horarios
                </router-link>
                <router-link
                  to="/admin/seats"
                  class="list-group-item list-group-item-action d-flex align-items-center gap-2"
                  active-class="active"
                >
                  🪑 Asientos
                </router-link>
                <router-link
                  to="/admin/reservations"
                  class="list-group-item list-group-item-action d-flex align-items-center gap-2"
                  active-class="active"
                >
                  📋 Reservaciones
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
    const userData = JSON.parse(user)
    if (userData.role === 'admin') {
      currentUser.value = userData
    } else {
      router.push('/client')
    }
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
