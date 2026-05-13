<template>
  <div class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content product-form-modal">
        <form @submit.prevent="save">
          <div class="modal-header">
            <div>
              <h5 class="modal-title mb-0">{{ title }}</h5>
              <p class="text-muted small mb-0">Administra la película y sus horarios.</p>
            </div>
            <button type="button" class="btn-close" @click="$emit('close')" aria-label="Cerrar"></button>
          </div>

          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Título</label>
                <input v-model="draft.title" class="form-control" required />
              </div>
              <div class="col-md-3">
                <label class="form-label">Género</label>
                <input v-model="draft.genre" class="form-control" required />
              </div>
              <div class="col-md-3">
                <label class="form-label">Duración (min)</label>
                <input v-model.number="draft.duration" type="number" min="1" class="form-control" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Clasificación</label>
                <input v-model="draft.rating" class="form-control" placeholder="PG-13" required />
              </div>
              <div class="col-md-8">
                <label class="form-label">Imagen</label>
                <input v-model="draft.image" class="form-control" placeholder="https://..." />
              </div>
              <div class="col-12">
                <label class="form-label">Descripción</label>
                <textarea v-model="draft.description" class="form-control" rows="3"></textarea>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-4 mb-2">
              <h6 class="mb-0">Horarios y precios</h6>
              <button type="button" class="btn btn-outline-primary btn-sm" @click="addShowtime">+ Agregar horario</button>
            </div>

            <div v-if="draft.showtimes.length === 0" class="alert alert-warning mb-0">
              Agrega al menos un horario para que el cliente pueda comprar.
            </div>

            <div v-for="(showtime, index) in draft.showtimes" :key="showtime.id" class="border rounded p-3 mb-3 bg-light">
              <div class="row g-3 align-items-end">
                <div class="col-md-4">
                  <label class="form-label">Hora</label>
                  <input v-model="showtime.time" class="form-control" placeholder="7:00pm" required />
                </div>
                <div class="col-md-3">
                  <label class="form-label">Precio</label>
                  <input v-model.number="showtime.price" type="number" step="0.1" min="0" class="form-control" required />
                </div>
                <div class="col-md-3">
                  <label class="form-label">Puestos</label>
                  <input v-model.number="showtime.availableSeats" type="number" min="0" class="form-control" required />
                </div>
                <div class="col-md-2 text-end">
                  <button type="button" class="btn btn-outline-danger w-100" @click="removeShowtime(index)">Eliminar</button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { formatShowtime } from '../utils/time'

const props = defineProps({
  visible: Boolean,
  movie: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: 'Película',
  },
})

const emit = defineEmits(['close', 'save'])

function createEmptyMovie() {
  return {
    title: '',
    genre: '',
    duration: 120,
    rating: 'PG-13',
    image: '',
    description: '',
    showtimes: [{ id: Date.now(), time: '', price: 0, availableSeats: 50 }],
  }
}

const draft = reactive(createEmptyMovie())

function normalizeMovie(movie) {
  const sourceShowtimes = Array.isArray(movie?.showtimes) && movie.showtimes.length > 0
    ? movie.showtimes
    : createEmptyMovie().showtimes

  return {
    title: movie?.title ?? '',
    genre: movie?.genre ?? '',
    duration: Number(movie?.duration ?? 120),
    rating: movie?.rating ?? 'PG-13',
    image: movie?.image ?? '',
    description: movie?.description ?? '',
    showtimes: sourceShowtimes.map((showtime, index) => ({
      id: showtime.id ?? Date.now() + index,
      time: formatShowtime(showtime.time ?? ''),
      price: Number(showtime.price ?? 0),
      availableSeats: Number(showtime.availableSeats ?? 50),
    })),
  }
}

watch(
  () => [props.visible, props.movie],
  ([visible]) => {
    if (!visible) return
    Object.assign(draft, normalizeMovie(props.movie))
  },
  { immediate: true, deep: true },
)

function addShowtime() {
  draft.showtimes.push({
    id: Date.now() + draft.showtimes.length,
    time: '',
    price: 0,
    availableSeats: 50,
  })
}

function removeShowtime(index) {
  draft.showtimes.splice(index, 1)
}

function save() {
  emit('save', normalizeMovie(draft))
}
</script>

<style scoped>
.product-form-modal {
  max-height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.product-form-modal form {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 3rem);
}

.product-form-modal .modal-body {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #64748b #e2e8f0;
}

.product-form-modal .modal-body::-webkit-scrollbar {
  width: 12px;
}

.product-form-modal .modal-body::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 999px;
}

.product-form-modal .modal-body::-webkit-scrollbar-thumb {
  background: #64748b;
  border-radius: 999px;
  border: 3px solid #e2e8f0;
}
</style>