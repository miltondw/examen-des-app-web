<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>🎫 Mis Reservaciones</h2>
      <router-link to="/client/movies" class="btn btn-primary btn-sm">
        ← Volver a Películas
      </router-link>
    </div>

    <div v-if="reservations.length > 0" class="row g-3">
      <div v-for="reservation in reservations" :key="reservation.id" class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-header" style="background: var(--gray-50); border-bottom: 2px solid var(--success);">
            <h6 class="mb-0" style="color: var(--success);">✅ Reservación Confirmada</h6>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ reservation.movieTitle }}</h5>
            <div class="row g-2">
              <div class="col-6">
                <small class="text-muted">Horario</small>
                <p class="mb-0 fw-bold">⏰ {{ reservation.time }}</p>
              </div>
              <div class="col-6">
                <small class="text-muted">Precio Total</small>
                <p class="mb-0 fw-bold" style="color: var(--primary);">${{ reservation.totalPrice }}</p>
              </div>
            </div>
            <hr class="my-2">
            <small class="text-muted">Asientos</small>
            <p class="mb-0">
              <span v-for="(seat, i) in reservation.seats" :key="i" class="badge me-2" style="background: var(--primary); color: white;">
                {{ seat }}
              </span>
            </p>
            <hr class="my-2">
            <small class="text-muted d-block">{{ reservation.date }}</small>
            <div class="mt-2">
              <button @click="cancelReservation(reservation.id)" class="btn btn-sm btn-outline-danger">
                Cancelar Reservación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning mt-4">
      <h5>📽️ No tienes reservaciones</h5>
      <p class="mb-0">¡Selecciona una película y reserva tus asientos!</p>
      <router-link to="/client/movies" class="btn btn-primary btn-sm mt-2">
        Ver Películas Disponibles
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const reservations = ref([])

function loadReservations() {
  const stored = localStorage.getItem('userReservations')
  if (stored) {
    reservations.value = JSON.parse(stored)
  }
}

function cancelReservation(id) {
  if (confirm('¿Estás seguro que deseas cancelar esta reservación?')) {
    reservations.value = reservations.value.filter(r => r.id !== id)
    localStorage.setItem('userReservations', JSON.stringify(reservations.value))
  }
}

onMounted(loadReservations)
</script>

<style scoped>
.card {
  border: none;
  background: white;
}
.card-header {
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}
</style>
