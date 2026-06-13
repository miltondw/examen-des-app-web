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
      <ProductCard 
        v-for="movie in products" 
        :key="movie.id" 
        :movie="movie" 
        :role="role"
        @edit="startEdit"
        @delete="askDelete"
        @view-reservations="viewReservations"
        @select-showtime="openMovieModal"
      />
    </div>

    <Modal v-if="showMovieModal" :isOpen="showMovieModal" :title="modalMovie?.title ? `Seleccionar función - ${modalMovie.title}` : 'Seleccionar función'" @close="closeMovieModal">
      <div v-if="modalMovie" class="row g-4 align-items-start">
        <div class="col-12 col-md-5">
          <img :src="modalMovie.image" :alt="modalMovie.title" class="img-fluid rounded-3 shadow-sm w-100" />
        </div>
        <div class="col-12 col-md-7">
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span class="badge text-bg-dark">{{ modalMovie.genre }}</span>
            <span class="badge text-bg-secondary">{{ modalMovie.duration }} min</span>
            <span class="badge text-bg-info">{{ modalMovie.rating }}</span>
          </div>
          <p class="text-muted mb-3">{{ modalMovie.description }}</p>
          <div class="alert alert-primary mb-0">Selecciona un horario para continuar con la selección de puestos.</div>
        </div>
      </div>
      <template #footer>
        <div class="d-flex flex-wrap gap-2 justify-content-end w-100">
          <button v-for="showtime in modalMovie?.showtimes || []" :key="showtime.id" type="button" class="btn btn-primary" @click="onModalSelectShowtime(showtime)">
            {{ formatShowtime(showtime.time) }}
          </button>
          <button type="button" class="btn btn-secondary" @click="closeMovieModal">Cancelar</button>
        </div>
      </template>
    </Modal>

    <SeatSelector v-if="showSeatSelector" :occupiedSeats="occupiedSeats" :selectedSeats="selectedSeats" :pricePerSeat="currentShowtime?.price || 0" @toggle-seat="handleToggleSeat" @confirm="confirmSeats" @cancel="closeSeatSelector" />

    <SuccessModal v-if="showSuccessModal" :isOpen="showSuccessModal" :reservationId="lastReservationId" :seatCount="lastReservationSeatCount" :totalPrice="formatMoney(lastReservationTotalPrice)" @close="closeSuccessModal" />

    <FormModal v-if="showForm" :isOpen="showForm" :title="editId ? 'Editar película' : 'Nueva película'" submitText="Guardar película" @close="closeForm" @submit="saveMovie(movieForm)">
      <div class="row g-3">
        <div class="col-12 col-md-6"><label class="form-label fw-semibold">Título</label><input v-model="movieForm.title" class="form-control" type="text" required /></div>
        <div class="col-12 col-md-6"><label class="form-label fw-semibold">Género</label><input v-model="movieForm.genre" class="form-control" type="text" required /></div>
        <div class="col-12 col-md-4"><label class="form-label fw-semibold">Duración (min)</label><input v-model.number="movieForm.duration" class="form-control" type="number" min="1" required /></div>
        <div class="col-12 col-md-4"><label class="form-label fw-semibold">Clasificación</label><input v-model="movieForm.rating" class="form-control" type="text" placeholder="PG-13" required /></div>
        <div class="col-12 col-md-4"><label class="form-label fw-semibold">Imagen URL</label><input v-model="movieForm.image" class="form-control" type="url" required /></div>
        <div class="col-12"><label class="form-label fw-semibold">Descripción</label><textarea v-model="movieForm.description" class="form-control" rows="3" required></textarea></div>
      </div>
      <div class="border rounded-3 p-3 bg-light mt-3">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h6 class="mb-0">Horarios</h6>
          <button type="button" class="btn btn-outline-primary btn-sm" @click="addShowtime">+ Agregar horario</button>
        </div>
        <div v-for="(showtime, index) in movieForm.showtimes" :key="showtime.id" class="row g-2 align-items-end mb-3">
          <div class="col-12 col-md-4"><label class="form-label small text-muted">Hora</label><input v-model="showtime.time" class="form-control" type="text" placeholder="19:00" required /></div>
          <div class="col-12 col-md-4"><label class="form-label small text-muted">Precio COP</label><input v-model.number="showtime.price" class="form-control" type="number" min="0" required /></div>
          <div class="col-12 col-md-3"><label class="form-label small text-muted">Puestos</label><input v-model.number="showtime.availableSeats" class="form-control" type="number" min="1" required /></div>
          <div class="col-12 col-md-1 d-grid"><button type="button" class="btn btn-outline-danger" @click="removeShowtime(index)">×</button></div>
        </div>
      </div>
    </FormModal>

    <ConfirmDialog v-if="showDeleteModal" :isOpen="showDeleteModal" :message="`¿Eliminar ${deleteTarget?.title}?`" confirmText="Eliminar" confirmVariant="danger" @confirm="confirmDelete" @cancel="closeDeleteModal" />

    <Modal v-if="showReservations" :isOpen="showReservations" :title="`Reservas de ${reservationsForMovie?.title || 'película'}`" @close="closeReservations">
      <div class="d-grid gap-3">
        <div v-for="group in groupedReservations" :key="group.showtime" class="border rounded-3 p-3 bg-light">
          <h6 class="mb-3">Horario {{ group.showtime }} <span class="badge text-bg-secondary">{{ group.items.length }} reservas</span></h6>
          <div class="list-group">
            <div v-for="reservation in group.items" :key="reservation.id" class="list-group-item d-flex justify-content-between">
              <div><strong>{{ reservation.user.name }}</strong><div class="text-muted small">{{ reservation.user.username }}</div></div>
              <div class="text-end"><div class="fw-semibold">{{ reservation.seats.join(', ') }}</div><div class="text-muted small">{{ reservation.seats.length }} puestos</div></div>
            </div>
          </div>
        </div>
      </div>
      <template #footer><button type="button" class="btn btn-secondary" @click="closeReservations">Cerrar</button></template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import * as api from '@/services/apiService'
import { Modal, SeatSelector, FormModal, ConfirmDialog, SuccessModal } from '@/components'
import { formatShowtime, formatMoney } from '@/utils/time'
import ProductCard from '@/components/products/ProductCard.vue'

function createEmptyMovie() {
  return { title: '', genre: '', duration: 0, rating: '', image: '', description: '', showtimes: [] }
}

const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null')
const role = currentUser?.role || 'client'

const products = ref([])
const showForm = ref(false)
const editId = ref(null)
const editingMovie = ref(createEmptyMovie())
const movieForm = editingMovie
const showSeatSelector = ref(false)
const currentMovie = ref(null)
const currentShowtime = ref('')
const occupiedSeats = ref([])
const selectedSeats = ref([])
const reservations = ref([])
const reservationsForMovie = ref(null)
const showReservations = ref(false)
const showSuccessModal = ref(false)
const lastReservationId = ref(null)
const lastReservationSeatCount = ref(0)
const lastReservationTotalPrice = ref(0)
const showMovieModal = ref(false)
const modalMovie = ref(null)
const showDeleteModal = ref(false)
const deleteTarget = ref(null)

async function load() {
  products.value = await api.getProducts()
}

onMounted(load)

// Métodos de Admin
function openCreate() { editId.value = null; editingMovie.value = createEmptyMovie(); showForm.value = true }
function closeForm() { showForm.value = false }
function addShowtime() { editingMovie.value.showtimes.push({ id: Date.now() + Math.random(), time: '', price: 0, availableSeats: 1 }) }
function removeShowtime(index) { editingMovie.value.showtimes.splice(index, 1) }

function startEdit(p) {
  editId.value = p.id
  editingMovie.value = { ...p, duration: Number(p.duration || 0), showtimes: Array.isArray(p.showtimes) ? [...p.showtimes] : [] }
  showForm.value = true
}

async function saveMovie(movie) {
  const payload = { ...movie, duration: Number(movie.duration) }
  if (editId.value) await api.updateProduct(editId.value, payload)
  else await api.createProduct(payload)
  showForm.value = false
  await load()
}

function askDelete(movie) { deleteTarget.value = movie; showDeleteModal.value = true }
function closeDeleteModal() { showDeleteModal.value = false; deleteTarget.value = null }
async function confirmDelete() { await api.deleteProduct(deleteTarget.value.id); closeDeleteModal(); await load() }

// Métodos de Cliente (Reservas)
function openMovieModal(movie){ modalMovie.value = movie; showMovieModal.value = true }
function closeMovieModal(){ showMovieModal.value = false }

function onModalSelectShowtime(time){
  if(!modalMovie.value) return
  openSeatSelector(modalMovie.value, time)
  showMovieModal.value = false
}

function openSeatSelector(movie, showtime){
  currentMovie.value = movie
  currentShowtime.value = showtime
  const showtimeHour = typeof showtime === 'object' ? showtime.time : showtime
  api.getReservationsByMovie(movie.id).then((list)=>{
    const occ = list.filter(r=>r.showtime===showtimeHour).flatMap(r=>r.seats)
    occupiedSeats.value = occ
    showSeatSelector.value = true
  }).catch(e => console.error("Error cargando reservas:", e)) // Manejo de errores agregado
}

function handleToggleSeat(seat) {
  const index = selectedSeats.value.indexOf(seat)
  if (index > -1) selectedSeats.value.splice(index, 1)
  else if (selectedSeats.value.length < 6) selectedSeats.value.push(seat)
}

function closeSeatSelector() { showSeatSelector.value = false; selectedSeats.value = [] }
function closeSuccessModal() { showSuccessModal.value = false; selectedSeats.value = [] }

async function confirmSeats(selected){
  const user = JSON.parse(localStorage.getItem('current_user'))
  if (!user) return alert('Debe iniciar sesión')
  if (selected.length > 6 || selected.length === 0) return alert('Selecciona entre 1 y 6 puestos')
  
  const showtimeStr = typeof currentShowtime.value === 'object' ? currentShowtime.value.time : currentShowtime.value
  const showtimePrice = currentShowtime.value?.price ?? 0
  
  const res = await api.createReservation({
    movieId: currentMovie.value.id,
    movieTitle: currentMovie.value.title,
    showtime: showtimeStr,
    showtimePrice: showtimePrice,
    seats: selected,
    user,
  })
  
  lastReservationId.value = res.id
  lastReservationSeatCount.value = selected.length
  lastReservationTotalPrice.value = selected.length * showtimePrice
  showSeatSelector.value = false
  showSuccessModal.value = true
  selectedSeats.value = []
}

async function viewReservations(movie){
  reservationsForMovie.value = movie
  reservations.value = await api.getReservationsByMovie(movie.id)
  showReservations.value = true
}

function closeReservations() { showReservations.value = false; reservations.value = [] }

const groupedReservations = computed(() => {
  const groups = new Map()
  for (const reservation of reservations.value) {
    const key = reservation.showtime || 'Sin horario'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(reservation)
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([showtime, items]) => ({ showtime, items }))
})
</script>