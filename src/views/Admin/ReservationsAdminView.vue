<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>📋 Gestión de Reservaciones</h2>
      <button @click="filterMode = filterMode === 'all' ? 'pending' : 'all'" class="btn" style="background: var(--info); color: white;">
        {{ filterMode === 'all' ? 'Ver Solo Pendientes' : 'Ver Todas' }}
      </button>
    </div>

    <!-- Estadísticas -->
    <div class="row mb-4 g-3">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h6 class="text-muted mb-2">Total de Reservaciones</h6>
            <h2 style="color: var(--primary);">{{ reservations.length }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h6 class="text-muted mb-2">Ingresos Totales</h6>
            <h2 style="color: var(--success);">${{ totalRevenue }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h6 class="text-muted mb-2">Asientos Vendidos</h6>
            <h2 style="color: var(--info);">{{ totalSeatsBooked }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Reservaciones -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Película</th>
            <th>Cliente</th>
            <th>Horario</th>
            <th>Asientos</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in filteredReservations" :key="reservation.id">
            <td><small>#{{ reservation.id }}</small></td>
            <td><strong>{{ reservation.movieTitle }}</strong></td>
            <td>Usuario Demo</td>
            <td>{{ reservation.time }}</td>
            <td>
              <span v-for="(seat, i) in reservation.seats" :key="i" class="badge bg-secondary me-1 mb-1">
                {{ seat }}
              </span>
            </td>
            <td><span class="fw-bold text-success">${{ reservation.totalPrice }}</span></td>
            <td><small>{{ reservation.date }}</small></td>
            <td>
              <span class="badge bg-success">Confirmada</span>
            </td>
            <td>
              <button class="btn btn-sm btn-info me-2" @click="viewDetails(reservation)">
                👁️ Ver
              </button>
              <button class="btn btn-sm btn-danger" @click="cancelReservation(reservation.id)">
                ❌ Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredReservations.length === 0" class="alert alert-warning mt-4">
      📋 No hay reservaciones disponibles.
    </div>

    <!-- Modal de Detalles -->
    <div v-if="selectedReservation" class="modal d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles de Reservación</h5>
            <button type="button" class="btn-close" @click="selectedReservation = null"></button>
          </div>
          <div class="modal-body">
            <h6 class="fw-bold">{{ selectedReservation.movieTitle }}</h6>
            <hr>
            <p><strong>Horario:</strong> {{ selectedReservation.time }}</p>
            <p><strong>Asientos:</strong></p>
            <p>
              <span v-for="(seat, i) in selectedReservation.seats" :key="i" class="badge bg-primary me-2 mb-2">
                {{ seat }}
              </span>
            </p>
            <p><strong>Total:</strong> ${{ selectedReservation.totalPrice }}</p>
            <p><strong>Fecha de Reserva:</strong> {{ selectedReservation.date }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedReservation = null">Cerrar</button>
            <button type="button" class="btn btn-danger" @click="confirmCancel">Cancelar Reservación</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const reservations = ref([])
const filterMode = ref('all')
const selectedReservation = ref(null)

const filteredReservations = computed(() => {
  return reservations.value.filter(r => {
    if (filterMode.value === 'pending') {
      return r.status === 'pending'
    }
    return true
  })
})

const totalRevenue = computed(() => {
  return reservations.value.reduce((sum, r) => sum + r.totalPrice, 0).toFixed(2)
})

const totalSeatsBooked = computed(() => {
  return reservations.value.reduce((sum, r) => sum + r.seats.length, 0)
})

function loadReservations() {
  const stored = localStorage.getItem('userReservations')
  if (stored) {
    reservations.value = JSON.parse(stored)
  }
}

function viewDetails(reservation) {
  selectedReservation.value = reservation
}

function confirmCancel() {
  if (selectedReservation.value) {
    cancelReservation(selectedReservation.value.id)
    selectedReservation.value = null
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
.modal.d-block {
  z-index: 1050;
}
.table tbody tr {
  transition: background-color 0.2s ease;
}
.table tbody tr:hover {
  background-color: var(--gray-50);
}
</style>
