<template>
  <Modal 
    :isOpen="isOpen"
    title="Confirmación requerida"
    @close="cancel"
  >
    <Text class="mb-3">{{ message }}</Text>
    
    <template #footer>
      <Button 
        variant="secondary"
        @click="cancel"
      >
        Cancelar
      </Button>
      <Button 
        :variant="confirmVariant"
        @click="confirm"
      >
        {{ confirmText }}
      </Button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '@/components/organisms/Modal.vue'
import Button from '@/components/atoms/Button.vue'
import Text from '@/components/atoms/Text.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  confirmVariant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'danger', 'success', 'warning'].includes(v)
  }
})

defineEmits(['confirm', 'cancel'])

const confirm = () => emit('confirm')
const cancel = () => emit('cancel')
</script>

<style scoped></style>
