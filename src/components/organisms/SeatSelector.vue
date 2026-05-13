<template>
  <Modal 
    :isOpen="true"
    title="Seleccionar Puestos"
    @close="handleCancel"
  >
    <div class="seat-selector-content">
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

      <div class="price-summary mt-4">
        <Text tag="h6" bold class="mb-2">
          Total: <span class="text-success">{{ formatPrice(totalPrice) }}</span>
        </Text>
        <Text size="sm" muted>{{ selectedSeats.length }} de máximo 6 puestos seleccionados</Text>
      </div>
    </div>
    
    <template #footer>
      <Button 
        variant="secondary"
        @click="handleCancel"
      >
        Cancelar
      </Button>
      <Button 
        variant="primary"
        :disabled="selectedSeats.length === 0 || selectedSeats.length > 6"
        @click="handleConfirm"
      >
        Confirmar ({{ selectedSeats.length }})
      </Button>
    </template>
  </Modal>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import Modal from '@/components/organisms/Modal.vue'
import SeatRow from '@/components/molecules/SeatRow.vue'
import Text from '@/components/atoms/Text.vue'
import Button from '@/components/atoms/Button.vue'
import { formatMoney } from '@/utils/time'

const props = defineProps({
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
    default: 0
  }
})

const emit = defineEmits(['toggle-seat', 'confirm', 'cancel'])

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const totalPrice = computed(() => {
  return props.selectedSeats.length * props.pricePerSeat
})

const formatPrice = (price) => formatMoney(price)

const handleToggleSeat = (seat) => {
  emit('toggle-seat', seat)
}

const handleConfirm = () => {
  emit('confirm', props.selectedSeats)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.seat-selector-content {
  max-height: 70vh;
  overflow-y: auto;
}

.legend-seat {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid #d1d5db;
}

.legend-seat.seat-available {
  background: white;
}

.legend-seat.seat-selected {
  background: #2c3e50;
  border-color: #2c3e50;
}

.legend-seat.seat-occupied {
  background: #9ca3af;
  border-color: #6b7280;
}

.seats-grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 0.5rem;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin: 1rem 0;
}

.row-letter {
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
  color: #4b5563;
}

.row-label {
  text-align: center;
  font-weight: 500;
  font-size: 0.8rem;
  color: #6b7280;
}

.price-summary {
  background: #f3f4f6;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #d1d5db;
  text-align: center;
}

.text-success {
  color: #10b981;
  font-size: 1.5em;
  font-weight: 600;
}

@media (max-width: 768px) {
  .seats-grid {
    grid-template-columns: repeat(13, 30px);
    overflow-x: auto;
  }

  .seat-selector-content {
    max-height: 60vh;
  }
}
</style>
