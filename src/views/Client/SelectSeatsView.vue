<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>🪑 Selecciona tus Asientos</h2>
      <router-link to="/client/movies" class="btn btn-secondary btn-sm">
        ← Volver
      </router-link>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <!-- Pantalla del Cine -->
        <div class="text-center mb-4">
          <div class="p-3 rounded" style="min-height: 50px; display: flex; align-items: center; justify-content: center; background: var(--gray-900); color: white;">
            <h6 class="mb-0">🎬 PANTALLA</h6>
          </div>
        </div>

        <!-- Asientos -->
        <div class="seat-grid">
          <div v-for="row in seatRows" :key="row" class="seat-row mb-3">
            <div class="row-label">{{ row }}</div>
            <div class="seats-container">
              <button
                v-for="col in seatsPerRow"
                :key="`${row}-${col}`"
                @click="toggleSeat(`${row}${col}`)"
                :class="['seat', {
                  'seat-selected': isSelected(`${row}${col}`),
                  'seat-occupied': isOccupied(`${row}${col}`)
                }]"
                :disabled="isOccupied(`${row}${col}`)"
              >
                {{ col }}
              </button>
            </div>
          </div>
        </div>

        <!-- Leyenda -->
        <div class="mt-4 p-3 rounded" style="background: var(--gray-100);">
          <div class="row">
            <div class="col-auto">
              <span class="seat seat-available me-2"></span>
              <small>Disponible</small>
            </div>
            <div class="col-auto">
              <span class="seat seat-selected me-2"></span>
              <small>Seleccionado</small>
            </div>
            <div class="col-auto">
              <span class="seat seat-occupied me-2"></span>
              <small>Ocupado</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen -->
      <div class="col-lg-4">
        <div class="card shadow-sm sticky-top" style="top: 100px;">
          <div class="card-header" style="background: var(--primary); color: white;">
            <h6 class="mb-0">📋 Resumen de Reserva</h6>
          </div>
          <div class="card-body">
            <h5>{{ movieTitle }}</h5>
            <hr>
            <div class="mb-3">
              <small class="text-muted d-block">Horario</small>
              <p class="mb-0 fw-bold">⏰ {{ showtimeInfo.time }}</p>
            </div>
            <div class="mb-3">
              <small class="text-muted d-block">Asientos Seleccionados</small>
              <p v-if="selectedSeats.length > 0" class="mb-0">
                <span v-for="(seat, i) in selectedSeats" :key="i" class="badge me-2 mb-2" style="background: var(--primary); color: white;">
                  {{ seat }}
                </span>
              </p>
              <p v-else class="text-muted mb-0">Ninguno</p>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-3">
              <span>Cantidad:</span>
              <strong>{{ selectedSeats.length }}</strong>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Precio por asiento:</span>
              <strong>${{ showtimeInfo.price }}</strong>
            </div>
            <div class="d-flex justify-content-between mb-3 fs-5">
              <span>Total:</span>
              <strong style="color: var(--primary);">${{ totalPrice }}</strong>
            </div>
            <button 
              @click="confirmReservation"
              :disabled="selectedSeats.length === 0"
              class="btn btn-success w-100 fw-bold"
            >
              Confirmar Reservación
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const movieId = parseInt(route.params.movieId)
const showtimeId = parseInt(route.params.showtimeId)

const movies = ref([])
const selectedSeats = ref([])
const seatRows = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
const seatsPerRow = ref(12)

const movieTitle = computed(() => {
  const movie = movies.value.find(m => m.id === movieId)
  return movie?.title || ''
})

const showtimeInfo = computed(() => {
  const movie = movies.value.find(m => m.id === movieId)
  const showtime = movie?.showtimes.find(s => s.id === showtimeId)
  return showtime || { time: '', price: 0, availableSeats: 0 }
})

const totalPrice = computed(() => {
  return selectedSeats.value.length * (showtimeInfo.value.price || 0)
})

async function loadMovies() {
  try {
    const res = await fetch('/data/products.json')
    movies.value = await res.json()
  } catch (e) {
    console.error('Error cargando películas', e)
  }
}

function toggleSeat(seatId) {
  const index = selectedSeats.value.indexOf(seatId)
  if (index > -1) {
    selectedSeats.value.splice(index, 1)
  } else {
    selectedSeats.value.push(seatId)
  }
}

function isSelected(seatId) {
  return selectedSeats.value.includes(seatId)
}

function isOccupied(seatId) {
  // Aquí puedes agregar lógica para obtener los asientos ocupados de una base de datos
  // Por ahora, simularemos algunos asientos ocupados
  const occupiedSeats = ['A1', 'A2', 'B5', 'C8', 'D3', 'E6']
  return occupiedSeats.includes(seatId)
}

function confirmReservation() {
  if (selectedSeats.value.length === 0) {
    alert('Por favor selecciona al menos un asiento')
    return
  }

  const reservation = {
    id: Date.now(),
    movieId,
    movieTitle: movieTitle.value,
    showtimeId,
    time: showtimeInfo.value.time,
    price: showtimeInfo.value.price,
    seats: [...selectedSeats.value],
    totalPrice: totalPrice.value,
    date: new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  let reservations = JSON.parse(localStorage.getItem('userReservations') || '[]')
  reservations.push(reservation)
  localStorage.setItem('userReservations', JSON.stringify(reservations))

  alert('¡Reservación confirmada! 🎉')
  router.push('/client/my-reservations')
}

onMounted(loadMovies)
</script>

<style scoped>
.seat-grid {
  padding: 20px;
  background: var(--gray-100);
  border-radius: 8px;
}

.seat-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.row-label {
  min-width: 30px;
  font-weight: bold;
  text-align: center;
  color: var(--gray-700);
}

.seats-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.seat {
  width: 35px;
  height: 35px;
  border: 2px solid var(--gray-300);
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  transition: all 0.3s ease;
  padding: 0;
  color: var(--gray-700);
}

.seat-available {
  background: white;
  border-color: var(--gray-300);
  color: var(--gray-700);
}

.seat-available:hover:not(:disabled) {
  background: var(--gray-100);
  border-color: var(--primary);
  transform: scale(1.1);
}

.seat-selected {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.seat-occupied {
  background: var(--gray-200);
  border-color: var(--gray-400);
  color: var(--gray-500);
  cursor: not-allowed;
  opacity: 0.6;
}

.seat:disabled {
  cursor: not-allowed;
}

.seat-available, .seat-selected, .seat-occupied {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>
