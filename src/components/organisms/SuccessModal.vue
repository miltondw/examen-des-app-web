<template>
  <Modal 
    :isOpen="isOpen"
    title="Reserva Exitosa"
    @close="handleClose"
  >
    <div class="text-center">
      <div class="display-1 text-success mb-3">✓</div>
      <h5 class="mb-2">¡Compra registrada exitosamente!</h5>
      <p class="text-muted mb-3">
        Tu número de reserva es: <strong class="text-primary">#{{ reservationId }}</strong>
      </p>
      <p class="small text-muted mb-4">
        Se ha registrado tu reserva de <strong>{{ seatCount }} puestos</strong> por un total de <strong>{{ totalPrice }}</strong>
      </p>
    </div>
    
    <template #footer>
      <Button 
        variant="primary"
        @click="handleClose"
      >
        Aceptar
      </Button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '@/components/organisms/Modal.vue'
import Button from '@/components/atoms/Button.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  reservationId: {
    type: [String, Number],
    default: null
  },
  seatCount: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: String,
    default: '$0'
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>
