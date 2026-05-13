<template>
  <div class="seat-row d-flex gap-1 justify-content-center my-1">
    <div v-for="seatNum in 12" :key="`${rowLetter}-${seatNum}`" class="seat-item">
      <button
        :class="[
          'seat',
          {
            'seat-available': !isSeatOccupied(seatNum),
            'seat-occupied': isSeatOccupied(seatNum),
            'seat-selected': isSelected(seatNum)
          }
        ]"
        :disabled="isSeatOccupied(seatNum)"
        @click="toggleSeat(seatNum)"
        :title="`${rowLetter}-${seatNum}`"
      >
        {{ seatNum }}
      </button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  rowLetter: {
    type: String,
    required: true,
    validator: (v) => /^[A-H]$/.test(v)
  },
  occupiedSeats: {
    type: Array,
    default: () => []
  },
  selectedSeats: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-seat'])

const isSeatOccupied = (seatNum) => {
  return props.occupiedSeats.some(s => s === `${props.rowLetter}-${seatNum}`)
}

const isSelected = (seatNum) => {
  return props.selectedSeats.some(s => s === `${props.rowLetter}-${seatNum}`)
}

const toggleSeat = (seatNum) => {
  const seat = `${props.rowLetter}-${seatNum}`
  emit('toggle-seat', seat)
}
</script>

<style scoped>
.seat-row {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 0.5rem 0;
}

.seat {
  width: 36px;
  height: 36px;
  border: 2px solid var(--gray-300, #d1d5db);
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seat-available {
  background: white;
  border-color: var(--gray-400, #9ca3af);
  color: var(--gray-900, #111827);
}

.seat-available:hover {
  border-color: var(--primary, #2c3e50);
  background: var(--primary, #2c3e50);
  color: white;
  transform: scale(1.1);
}

.seat-selected {
  background: var(--primary, #2c3e50);
  border-color: var(--primary, #2c3e50);
  color: white;
  box-shadow: 0 0 8px rgba(44, 62, 80, 0.5);
}

.seat-occupied {
  background: var(--gray-400, #9ca3af);
  border-color: var(--gray-500, #6b7280);
  color: white;
  cursor: not-allowed;
  opacity: 0.6;
}

.seat-occupied:disabled {
  cursor: not-allowed;
}
</style>
