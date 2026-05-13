<template>
  <div class="container-fluid px-0">
    <div class="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-4">
      <div>
        <h2 class="h3 mb-1">Reservas</h2>
        <p class="text-muted mb-0">Vista del administrador agrupada por película y horario.</p>
      </div>
      <span class="badge text-bg-dark">{{ reservations.length }} reservas</span>
    </div>

    <div v-if="groupedReservations.length === 0" class="alert alert-info">
      Aún no hay reservas registradas.
    </div>

    <div v-for="movieGroup in groupedReservations" :key="movieGroup.movieTitle" class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
        <strong>{{ movieGroup.movieTitle }}</strong>
        <span class="text-muted small">{{ movieGroup.items.length }} reservas</span>
      </div>
      <div class="card-body">
        <div v-for="timeGroup in movieGroup.times" :key="timeGroup.showtime" class="mb-4">
          <h6 class="mb-3">Horario {{ formatShowtime(timeGroup.showtime) }}</h6>
          <div class="list-group">
            <div v-for="reservation in timeGroup.items" :key="reservation.id" class="list-group-item">
              <div class="row g-2 align-items-center">
                <div class="col-md-4">
                  <div class="fw-semibold">{{ reservation.user.name }}</div>
                  <div class="text-muted small">{{ reservation.user.username }}</div>
                </div>
                <div class="col-md-4">
                  <div class="small text-muted">Puestos</div>
                  <div>{{ reservation.seats.join(', ') }}</div>
                </div>
                <div class="col-md-4 text-md-end">
                  <div class="small text-muted">Reserva #{{ reservation.id }}</div>
                  <div class="fw-semibold">{{ reservation.seats.length }} puestos</div>
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
import { formatShowtime } from '../utils/time'

const reservations = ref([])

onMounted(async () => {
  reservations.value = await api.getReservations()
})

const groupedReservations = computed(() => {
  const byMovie = new Map()

  for (const reservation of reservations.value) {
    if (!byMovie.has(reservation.movieTitle)) {
      byMovie.set(reservation.movieTitle, [])
    }
    byMovie.get(reservation.movieTitle).push(reservation)
  }

  return [...byMovie.entries()].map(([movieTitle, items]) => {
    const byTime = new Map()
    for (const reservation of items) {
      if (!byTime.has(reservation.showtime)) {
        byTime.set(reservation.showtime, [])
      }
      byTime.get(reservation.showtime).push(reservation)
    }

    return {
      movieTitle,
      items,
      times: [...byTime.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([showtime, timeItems]) => ({ showtime, items: timeItems })),
    }
  })
})
</script>
