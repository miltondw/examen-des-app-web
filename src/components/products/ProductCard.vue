<template>
  <div class="col">
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
              <span class="badge text-bg-dark">Desde {{ formatMoney(basePrice) }}</span>
            </div>

            <p class="card-text text-muted small mb-3">{{ movie.description }}</p>

            <div class="d-flex flex-wrap gap-2 mb-3">
              <span v-for="showtime in movie.showtimes" :key="showtime.id" class="badge text-bg-secondary">
                {{ formatShowtime(showtime.time) }} - {{ formatMoney(showtime.price) }}
              </span>
            </div>

            <div class="mt-auto d-flex flex-wrap gap-2">
              <template v-if="role === 'admin'">
                <button class="btn btn-primary btn-sm" @click="$emit('edit', movie)">Editar</button>
                <button class="btn btn-outline-danger btn-sm" @click="$emit('delete', movie)">Eliminar</button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="$emit('view-reservations', movie)">
                  Ver reservas
                </button>
              </template>
              <template v-else>
                <button class="btn btn-primary btn-sm" @click="$emit('select-showtime', movie)">Seleccionar función</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatShowtime, formatMoney } from '@/utils/time' 

const props = defineProps({
  movie: { type: Object, required: true },
  role: { type: String, required: true }
})

defineEmits(['edit', 'delete', 'view-reservations', 'select-showtime'])

const basePrice = computed(() => {
  const prices = (props.movie.showtimes || []).map((s) => Number(s.price || 0)).filter((p) => p > 0)
  return prices.length > 0 ? Math.min(...prices) : 0
})
</script>