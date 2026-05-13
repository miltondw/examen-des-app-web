<template>
  <div class="seat-selector-container">
    <div class="seat-legend mb-4 d-flex gap-3 justify-content-center flex-wrap">
      <div class="legend-item d-flex align-items-center gap-2">
        <div class="legend-seat seat-available"></div>
        <Text size="sm">Disponible</Text>
      </div>
      <div class="legend-item d-flex align-items-center gap-2">
        <div class="legend-seat seat-selected"></div>
        <Text size="sm">Seleccionado</Text>
      </div>
      <div class="legend-item d-flex align-items-center gap-2">
        <div class="legend-seat seat-occupied"></div>
        <Text size="sm">Ocupado</Text>
      </div>
    </div>

    <div class="seats-grid">
      <div class="row-letter">Fila</div>
      <div v-for="row in rows" :key="row" class="row-label">{{ row }}</div>
      
      <div v-for="row in rows" :key="`row-${row}`">
        <div class="row-letter">{{ row }}</div>
        <SeatRow 
          :rowLetter="row"
          :occupiedSeats="occupiedSeats"
          :selectedSeats="selectedSeats"
          @toggle-seat="handleToggleSeat"
        />
      </div>
    </div>

    <div v-if="totalPrice > 0" class="price-summary mt-4 text-center">
      <Text tag="h4" bold>
        Total: <span class="text-primary">${{ totalPrice }}</span>
      </Text>
      <Text size="sm" muted>{{ selectedSeats.length }} asientos seleccionados</Text>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SeatRow from '@/components/molecules/SeatRow.vue'
import Text from '@/components/atoms/Text.vue'

defineProps({
  occupiedSeats: {
    type: Array,
    default: () => []
  },
  selectedSeats: {
    type: Array,
    default: () => []
  },
  pricePerSeat: {
    type: Number,
    default: 10
  }
})

defineEmits(['toggle-seat'])

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const totalPrice = computed(() => {
  return selectedSeats.length * pricePerSeat
})

const handleToggleSeat = (seat) => {
  emit('toggle-seat', seat)
}
</script>

<style scoped>
.seat-selector-container {
  padding: 2rem;
  background: var(--gray-50, #f9fafb);
  border-radius: 12px;
  margin: 2rem 0;
}

.seat-legend {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--gray-200, #e5e7eb);
}

.legend-item {
  padding: 0.5rem 1rem;
}

.legend-seat {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid var(--gray-300, #d1d5db);
}

.legend-seat.seat-available {
  background: white;
}

.legend-seat.seat-selected {
  background: var(--primary, #2c3e50);
  border-color: var(--primary, #2c3e50);
}

.legend-seat.seat-occupied {
  background: var(--gray-400, #9ca3af);
  border-color: var(--gray-500, #6b7280);
}

.seats-grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 0.5rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--gray-200, #e5e7eb);
}

.row-letter {
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--gray-600, #4b5563);
}

.row-label {
  text-align: center;
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--gray-500, #6b7280);
}

.price-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--primary, #2c3e50);
}

.text-primary {
  color: var(--primary, #2c3e50);
  font-size: 1.5em;
}

@media (max-width: 768px) {
  .seat-selector-container {
    padding: 1rem;
  }

  .seats-grid {
    grid-template-columns: repeat(13, 30px);
    overflow-x: auto;
    padding: 1rem 0;
  }

  .seat-legend {
    flex-direction: column;
  }
}
</style>
