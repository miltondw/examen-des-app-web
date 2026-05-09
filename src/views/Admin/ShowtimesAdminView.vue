<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>⏰ Gestión de Horarios</h2>
      <button class="btn btn-success" @click="openCreateShowtime">
        + Nuevo Horario
      </button>
    </div>

    <!-- Tabla de Horarios -->
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Película</th>
            <th>Horario</th>
            <th>Precio</th>
            <th>Asientos Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="showtime in allShowtimes" :key="showtime.showtimeId">
            <td><strong>{{ showtime.showtimeId }}</strong></td>
            <td>{{ showtime.movieTitle }}</td>
            <td>{{ showtime.time }}</td>
            <td>${{ showtime.price }}</td>
            <td>
              <span class="badge bg-success">{{ showtime.availableSeats }}</span>
            </td>
            <td>
              <button class="btn btn-sm btn-primary me-2" @click="editShowtime(showtime)">
                ✏️ Editar
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteShowtime(showtime.showtimeId)">
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario -->
    <div v-if="showForm" class="card mt-4 shadow-sm">
      <div class="card-header bg-primary text-white">
        <h6 class="mb-0">{{ editingId ? '✏️ Editar Horario' : '➕ Nuevo Horario' }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveShowtime">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Película</label>
              <select v-model.number="form.movieId" class="form-select" required>
                <option value="">-- Selecciona película --</option>
                <option v-for="m in movies" :key="m.id" :value="m.id">
                  {{ m.title }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Horario</label>
              <input v-model="form.time" class="form-control" type="time" required />
            </div>
            <div class="col-md-3">
              <label class="form-label">Precio</label>
              <input v-model.number="form.price" class="form-control" type="number" step="0.01" required />
            </div>
          </div>

          <div class="row g-3 mt-2">
            <div class="col-md-6">
              <label class="form-label">Asientos Disponibles</label>
              <input v-model.number="form.availableSeats" class="form-control" type="number" required />
            </div>
          </div>

          <div class="mt-3">
            <button type="submit" class="btn btn-primary me-2">
              {{ editingId ? '💾 Actualizar' : '➕ Crear' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="closeForm">
              ✖️ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const movies = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref({ 
  movieId: '',
  time: '',
  price: 0,
  availableSeats: 50
})

const allShowtimes = computed(() => {
  const showtimes = []
  movies.value.forEach(movie => {
    movie.showtimes.forEach(st => {
      showtimes.push({
        showtimeId: st.id,
        movieId: movie.id,
        movieTitle: movie.title,
        time: st.time,
        price: st.price,
        availableSeats: st.availableSeats
      })
    })
  })
  return showtimes
})

async function loadMovies() {
  try {
    const res = await fetch('/data/products.json')
    movies.value = await res.json()
  } catch (e) {
    console.error('Error cargando películas', e)
  }
}

function openCreateShowtime() {
  editingId.value = null
  form.value = { 
    movieId: '',
    time: '',
    price: 0,
    availableSeats: 50
  }
  showForm.value = true
}

function editShowtime(showtime) {
  editingId.value = showtime.showtimeId
  form.value = {
    movieId: showtime.movieId,
    time: showtime.time,
    price: showtime.price,
    availableSeats: showtime.availableSeats
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function saveShowtime() {
  const movie = movies.value.find(m => m.id === form.value.movieId)
  if (!movie) return

  if (editingId.value) {
    const showtime = movie.showtimes.find(st => st.id === editingId.value)
    if (showtime) {
      showtime.time = form.value.time
      showtime.price = form.value.price
      showtime.availableSeats = form.value.availableSeats
    }
  } else {
    const newShowtime = {
      id: Math.max(...allShowtimes.value.map(st => st.showtimeId), 0) + 1,
      time: form.value.time,
      price: form.value.price,
      availableSeats: form.value.availableSeats
    }
    movie.showtimes.push(newShowtime)
  }
  closeForm()
}

function deleteShowtime(showtimeId) {
  if (confirm('¿Estás seguro que deseas eliminar este horario?')) {
    movies.value.forEach(movie => {
      movie.showtimes = movie.showtimes.filter(st => st.id !== showtimeId)
    })
  }
}

onMounted(loadMovies)
</script>
