<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>🎬 Películas en Cartelera</h2>
      <div class="input-group" style="max-width: 300px;">
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-control" 
          placeholder="Buscar película..."
        />
      </div>
    </div>

    <!-- Películas Grid -->
    <div class="row g-4">
      <div v-for="movie in filteredMovies" :key="movie.id" class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm hover-lift">
          <img :src="movie.image" class="card-img-top" :alt="movie.title" style="height: 300px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-primary">{{ movie.title }}</h5>
            <div class="mb-2">
              <span class="badge bg-info text-dark me-2">{{ movie.genre }}</span>
              <span class="badge bg-secondary">{{ movie.duration }}min</span>
            </div>
            <p class="card-text small text-muted flex-grow-1">{{ movie.description }}</p>
            
            <!-- Horarios -->
            <div class="mt-3">
              <label class="form-label small fw-bold">Selecciona horario:</label>
              <select 
                v-model="selectedShowtime[movie.id]"
                class="form-select form-select-sm"
              >
                <option value="">-- Selecciona --</option>
                <option v-for="show in movie.showtimes" :key="show.id" :value="show.id">
                  {{ show.time }} - ${{ show.price }} ({{ show.availableSeats }} asientos)
                </option>
              </select>
            </div>

            <button 
              @click="selectSeats(movie.id)"
              :disabled="!selectedShowtime[movie.id]"
              class="btn btn-primary btn-sm w-100 mt-3"
            >
              Reservar Asientos →
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredMovies.length === 0" class="alert alert-info mt-4">
      📽️ No hay películas disponibles en este momento.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const movies = ref([])
const searchQuery = ref('')
const selectedShowtime = ref({})

const filteredMovies = computed(() => {
  return movies.value.filter(m => 
    m.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    m.genre.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

async function loadMovies() {
  try {
    const res = await fetch('/data/products.json')
    movies.value = await res.json()
  } catch (e) {
    console.error('Error cargando películas', e)
  }
}

function selectSeats(movieId) {
  const showtimeId = selectedShowtime.value[movieId]
  if (showtimeId) {
    router.push({
      name: 'SelectSeats',
      params: { movieId, showtimeId }
    })
  }
}

onMounted(loadMovies)
</script>

<style scoped>
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
}
.form-select:disabled {
  background-color: var(--gray-100);
  cursor: not-allowed;
}
</style>
