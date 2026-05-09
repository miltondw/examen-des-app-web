<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>🪑 Gestión de Asientos</h2>
    </div>

    <!-- Selector de Película y Horario -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label fw-bold">Selecciona Película</label>
            <select v-model.number="selectedMovieId" class="form-select">
              <option value="">-- Selecciona película --</option>
              <option v-for="m in movies" :key="m.id" :value="m.id">
                {{ m.title }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold">Selecciona Horario</label>
            <select v-model.number="selectedShowtimeId" class="form-select">
              <option value="">-- Selecciona horario --</option>
              <option v-for="st in availableShowtimes" :key="st.id" :value="st.id">
                {{ st.time }} - ${{ st.price }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedMovieId && selectedShowtimeId" class="card">
      <div class="card-header" style="background: var(--gray-900); color: white;">
        <h6 class="mb-0">
          📊 Vista de Asientos - {{ selectedMovieTitle }} ({{ selectedShowtimeTime }})
        </h6>
      </div>
      <div class="card-body">
        <!-- Pantalla -->
        <div class="text-center mb-4">
          <div class="p-3 rounded text-white" style="min-height: 50px; display: flex; align-items: center; justify-content: center; background: var(--gray-900);">
            <h6 class="mb-0">🎬 PANTALLA</h6>
          </div>
        </div>

        <!-- Asientos -->
        <div class="seat-grid p-3 rounded" style="background: var(--gray-100);">
          <div v-for="row in seatRows" :key="row" class="seat-row mb-3">
            <div class="row-label">{{ row }}</div>
            <div class="seats-container">
              <button
                v-for="col in seatsPerRow"
                :key="`${row}-${col}`"
                @click="toggleSeat(`${row}${col}`)"
                :class="['seat', {
                  'seat-occupied': isOccupied(`${row}${col}`)
                }]"
              >
                {{ col }}
              </button>
            </div>
          </div>
        </div>

        <!-- Estadísticas -->
        <div class="row mt-4 g-3">
          <div class="col-md-4">
            <div class="card bg-success bg-opacity-10">
              <div class="card-body text-center">
                <h6 class="text-success mb-0">Disponibles</h6>
                <h2 class="text-success">{{ totalAvailable }}</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-danger bg-opacity-10">
              <div class="card-body text-center">
                <h6 class="text-danger mb-0">Ocupados</h6>
                <h2 class="text-danger">{{ totalOccupied }}</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-info bg-opacity-10">
              <div class="card-body text-center">
                <h6 class="text-info mb-0">Total</h6>
                <h2 class="text-info">{{ totalSeats }}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 text-center">
          <button @click="toggleAllOccupied" class="btn btn-warning">
            {{ showOccupiedMode ? 'Ver Disponibles' : 'Ver Ocupados' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-info mt-4">
      ⚠️ Selecciona una película y un horario para ver la distribución de asientos.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const movies = ref([])
const selectedMovieId = ref(null)
const selectedShowtimeId = ref(null)
const showOccupiedMode = ref(false)
const occupiedSeats = ref([])

const seatRows = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
const seatsPerRow = ref(12)

const availableShowtimes = computed(() => {
  const movie = movies.value.find(m => m.id === selectedMovieId.value)
  return movie?.showtimes || []
})

const selectedMovieTitle = computed(() => {
  const movie = movies.value.find(m => m.id === selectedMovieId.value)
  return movie?.title || ''
})

const selectedShowtimeTime = computed(() => {
  const showtime = availableShowtimes.value.find(st => st.id === selectedShowtimeId.value)
  return showtime?.time || ''
})

const totalSeats = computed(() => {
  return seatRows.value.length * seatsPerRow.value
})

const totalOccupied = computed(() => {
  return occupiedSeats.value.length
})

const totalAvailable = computed(() => {
  return totalSeats.value - totalOccupied.value
})

async function loadMovies() {
  try {
    const res = await fetch('/data/products.json')
    movies.value = await res.json()
  } catch (e) {
    console.error('Error cargando películas', e)
  }

  // Simular asientos ocupados
  occupiedSeats.value = ['A1', 'A2', 'B5', 'C8', 'D3', 'E6', 'F10', 'G7', 'H2']
}

function isOccupied(seatId) {
  return occupiedSeats.value.includes(seatId)
}

function toggleSeat(seatId) {
  const index = occupiedSeats.value.indexOf(seatId)
  if (index > -1) {
    occupiedSeats.value.splice(index, 1)
  } else {
    occupiedSeats.value.push(seatId)
  }
}

function toggleAllOccupied() {
  showOccupiedMode.value = !showOccupiedMode.value
}

onMounted(loadMovies)
</script>

<style scoped>
.seat-grid {
  display: inline-block;
  margin: 0 auto;
}

.seat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
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

.seat:hover:not(.seat-occupied) {
  background: var(--gray-100);
  border-color: var(--primary);
  transform: scale(1.1);
}

.seat-occupied {
  background: var(--danger);
  border-color: var(--danger);
  color: white;
  cursor: default;
}
</style>
