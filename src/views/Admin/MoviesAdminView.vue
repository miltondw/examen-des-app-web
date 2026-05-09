<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>🎬 Gestión de Películas</h2>
      <button class="btn btn-success" @click="openCreateMovie">
        + Nueva Película
      </button>
    </div>

    <!-- Tabla de Películas -->
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Género</th>
            <th>Duración</th>
            <th>Rating</th>
            <th>Horarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td><strong>{{ movie.id }}</strong></td>
            <td>{{ movie.title }}</td>
            <td><span class="badge bg-info">{{ movie.genre }}</span></td>
            <td>{{ movie.duration }}min</td>
            <td><span class="badge bg-warning text-dark">{{ movie.rating }}</span></td>
            <td><span class="badge bg-success">{{ movie.showtimes.length }}</span></td>
            <td>
              <button class="btn btn-sm btn-primary me-2" @click="editMovie(movie)">
                ✏️ Editar
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteMovie(movie.id)">
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario de Crear/Editar -->
    <div v-if="showForm" class="card mt-4 shadow-sm">
      <div class="card-header bg-primary text-white">
        <h6 class="mb-0">{{ editingId ? '✏️ Editar Película' : '➕ Nueva Película' }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveMovie">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Título</label>
              <input v-model="form.title" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label class="form-label">Género</label>
              <input v-model="form.genre" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label class="form-label">Rating</label>
              <select v-model="form.rating" class="form-select" required>
                <option>G</option>
                <option>PG</option>
                <option>PG-13</option>
                <option>R</option>
              </select>
            </div>
          </div>

          <div class="row g-3 mt-2">
            <div class="col-md-3">
              <label class="form-label">Duración (min)</label>
              <input v-model.number="form.duration" class="form-control" type="number" required />
            </div>
            <div class="col-md-9">
              <label class="form-label">URL Imagen</label>
              <input v-model="form.image" class="form-control" />
            </div>
          </div>

          <div class="row g-3 mt-2">
            <div class="col-12">
              <label class="form-label">Descripción</label>
              <textarea v-model="form.description" class="form-control" rows="3"></textarea>
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

    <div v-if="movies.length === 0" class="alert alert-info mt-4">
      📽️ No hay películas registradas.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const movies = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref({ 
  title: '', 
  genre: '', 
  rating: 'PG-13',
  duration: 120,
  image: '',
  description: '',
  showtimes: []
})

async function loadMovies() {
  try {
    const res = await fetch('/data/products.json')
    movies.value = await res.json()
  } catch (e) {
    console.error('Error cargando películas', e)
  }
}

function openCreateMovie() {
  editingId.value = null
  form.value = { 
    title: '', 
    genre: '', 
    rating: 'PG-13',
    duration: 120,
    image: '',
    description: '',
    showtimes: []
  }
  showForm.value = true
}

function editMovie(movie) {
  editingId.value = movie.id
  form.value = { ...movie }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function saveMovie() {
  if (editingId.value) {
    const index = movies.value.findIndex(m => m.id === editingId.value)
    if (index > -1) {
      movies.value[index] = { ...form.value, id: editingId.value }
    }
  } else {
    const newMovie = {
      ...form.value,
      id: Math.max(...movies.value.map(m => m.id), 0) + 1,
      showtimes: []
    }
    movies.value.push(newMovie)
  }
  closeForm()
}

function deleteMovie(id) {
  if (confirm('¿Estás seguro que deseas eliminar esta película?')) {
    movies.value = movies.value.filter(m => m.id !== id)
  }
}

onMounted(loadMovies)
</script>

<style scoped>
.table {
  background: white;
}
.btn-sm {
  font-size: 0.8rem;
}
.card-header {
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}
</style>
