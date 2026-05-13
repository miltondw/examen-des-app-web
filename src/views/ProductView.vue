<template>
  <div class="container-fluid px-0">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div>
        <h2 class="h3 mb-1">Películas</h2>
        <p class="text-muted mb-0">Administra cartelera, horarios, precios y reservas.</p>
      </div>
      <div v-if="role === 'admin'">
        <button class="btn btn-success" @click="openCreate">+ Nueva película</button>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-xl-2 g-4">
      <div v-for="movie in products" :key="movie.id" class="col">
        <div class="card h-100 shadow-sm">
          <div class="row g-0 h-100">
            <div class="col-md-4">
              <img :src="movie.image" class="img-fluid h-100 w-100 object-fit-cover rounded-start" :alt="movie.title" />
            </div>
            <div class="col-md-8">
              <div class="card-body d-flex flex-column h-100">
                <div class="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <h5 class="card-title mb-1">{{ movie.title }}</h5>
                    <p class="text-muted small mb-2">{{ movie.genre }} • {{ movie.duration }} min • {{ movie.rating }}</p>
                  </div>
                  <span class="badge text-bg-dark">Desde {{ formatMoney(movieBasePrice(movie)) }}</span>
                </div>

                <p class="card-text text-muted small mb-3">{{ movie.description }}</p>

                <div class="d-flex flex-wrap gap-2 mb-3">
                  <span v-for="showtime in movie.showtimes" :key="showtime.id" class="badge text-bg-secondary">
                    {{ formatShowtime(showtime.time) }} - {{ formatMoney(showtime.price) }}
                  </span>
                </div>

                <div class="mt-auto d-flex flex-wrap gap-2">
                  <template v-if="role === 'admin'">
                    <button class="btn btn-primary btn-sm" @click="startEdit(movie)">Editar</button>
                    <button class="btn btn-outline-danger btn-sm" @click="askDelete(movie)">Eliminar</button>
                    <button class="btn btn-outline-secondary btn-sm" @click="viewReservations(movie)">Ver reservas</button>
                  </template>
                  <template v-else>
                    <button class="btn btn-primary btn-sm" @click="openMovieModal(movie)">Seleccionar función</button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FormModal v-if="showMovieModal" :isOpen="showMovieModal" :title="'Seleccionar función'" @close="closeMovieModal" @submit="onModalSelectShowtime">
      <p v-if="modalMovie">{{ modalMovie.title }}</p>
    </FormModal>

    <SeatSelector v-if="showSeatSelector" :occupiedSeats="occupiedSeats" :selectedSeats="[]" @toggle-seat="handleToggleSeat" />

    <FormModal v-if="showForm" :isOpen="showForm" :title="editId ? 'Editar película' : 'Nueva película'" @close="closeForm" @submit="saveMovie">
      <!-- Form content will go here -->
    </FormModal>

    <ConfirmDialog v-if="showDeleteModal" :isOpen="showDeleteModal" message="deleteTarget ? `¿Eliminar ${deleteTarget.title}? Esta acción no se puede deshacer.` : ''" confirmText="Eliminar" confirmVariant="danger" @confirm="confirmDelete" @cancel="closeDeleteModal" />

    <div v-if="showReservations" class="card mt-4">
      <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <strong>Reservas de {{ reservationsForMovie?.title }}</strong>
          <div class="small text-muted">Separadas por horario</div>
        </div>
        <button class="btn btn-sm btn-outline-secondary" @click="showReservations = false">Cerrar</button>
      </div>
      <div class="card-body">
        <div v-if="groupedReservations.length === 0" class="alert alert-info mb-0">
          Todavía no hay reservas para esta película.
        </div>
        <div v-for="group in groupedReservations" :key="group.showtime" class="mb-4">
          <h6 class="mb-3">Horario {{ group.showtime }}</h6>
          <div class="list-group">
            <div v-for="reservation in group.items" :key="reservation.id" class="list-group-item">
              <div class="d-flex justify-content-between gap-3">
                <div>
                  <strong>{{ reservation.user.name }}</strong>
                  <div class="text-muted small">{{ reservation.user.username }}</div>
                </div>
                <div class="text-end">
                  <div class="fw-semibold">{{ reservation.seats.join(', ') }}</div>
                  <div class="text-muted small">{{ reservation.seats.length }} puestos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import api from '../services/apiService'
import { SeatSelector, FormModal, ConfirmDialog } from '@/components'
import { formatShowtime, formatMoney } from '../utils/time'

const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null')
const role = currentUser?.role || 'client'

const products = ref([])
const showForm = ref(false)
const editId = ref(null)
const editingMovie = ref(null)
const showSeatSelector = ref(false)
const currentMovie = ref(null)
const currentShowtime = ref('')
const occupiedSeats = ref([])
const reservations = ref([])
const reservationsForMovie = ref(null)
const showReservations = ref(false)

const showMovieModal = ref(false)
const modalMovie = ref(null)
const showDeleteModal = ref(false)
const deleteTarget = ref(null)

async function load() {
  products.value = await api.getProducts()
}

onMounted(load)

function openCreate() {
  editId.value = null
  editingMovie.value = null
  showForm.value = true
}

function startEdit(p) {
  editId.value = p.id
  editingMovie.value = { ...p }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function normalizeMovie(movie) {
  const showtimes = Array.isArray(movie?.showtimes) ? movie.showtimes : []

  return {
    ...movie,
    duration: Number(movie.duration || 0),
    showtimes: showtimes.map((showtime, index) => ({
      id: showtime.id ?? Date.now() + index,
      time: formatShowtime(showtime.time || ''),
      price: Number(showtime.price || 0),
      availableSeats: Number(showtime.availableSeats || 0),
    })),
  }
}

async function saveMovie(movie) {
  const payload = normalizeMovie(movie)
  if (editId.value) {
    await api.updateProduct(editId.value, payload)
  } else {
    await api.createProduct(payload)
  }
  showForm.value = false
  await load()
}

function askDelete(movie) {
  deleteTarget.value = movie
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deleteTarget.value = null
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  await api.deleteProduct(deleteTarget.value.id)
  closeDeleteModal()
  await load()
}

function openSeatSelector(movie, showtime){
  currentMovie.value = movie
  currentShowtime.value = showtime
  const showtimeHour = typeof showtime === 'object' ? showtime.time : showtime
  api.getReservationsByMovie(movie.id).then((list)=>{
    const occ = list.filter(r=>r.showtime===showtimeHour).flatMap(r=>r.seats)
    occupiedSeats.value = occ
    showSeatSelector.value = true
  })
}

function openMovieModal(movie){
  modalMovie.value = movie
  showMovieModal.value = true
}

function closeMovieModal(){ showMovieModal.value = false }

function onModalSelectShowtime(time){
  if(!modalMovie.value) return
  openSeatSelector(modalMovie.value, time)
  showMovieModal.value = false
}

function closeSeatSelector(){ showSeatSelector.value = false }

async function confirmSeats(selected){
  const user = JSON.parse(localStorage.getItem('current_user'))
  if (!user) { alert('Debe iniciar sesion'); return }
  const showtimeStr = typeof currentShowtime.value === 'object' ? currentShowtime.value.time : currentShowtime.value
  const res = await api.createReservation({
    movieId: currentMovie.value.id,
    movieTitle: currentMovie.value.title,
    showtime: showtimeStr,
    showtimePrice: currentShowtime.value?.price ?? null,
    seats: selected,
    user,
  })
  showSeatSelector.value = false
  alert('Compra registrada: ' + res.id)
}

async function viewReservations(movie){
  reservationsForMovie.value = movie
  reservations.value = await api.getReservationsByMovie(movie.id)
  showReservations.value = true
}

function movieBasePrice(movie) {
  const prices = (movie.showtimes || []).map((showtime) => Number(showtime.price || 0)).filter((price) => price > 0)
  if (prices.length === 0) return '0'
  return Math.min(...prices)
}

const groupedReservations = computed(() => {
  const groups = new Map()

  for (const reservation of reservations.value) {
    const key = reservation.showtime || 'Sin horario'
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key).push(reservation)
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([showtime, items]) => ({ showtime, items }))
})
</script>