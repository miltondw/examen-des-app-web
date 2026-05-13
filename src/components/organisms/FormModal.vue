<template>
  <Modal 
    :isOpen="isOpen"
    :title="title"
    @close="cancel"
  >
    <form @submit.prevent="submit" class="d-grid gap-3">
      <slot />
    </form>

    <template #footer>
      <Button variant="secondary" @click="cancel">
        Cancelar
      </Button>
      <Button variant="primary" type="submit" @click="submit">
        {{ submitText }}
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
  title: {
    type: String,
    required: true
  },
  submitText: {
    type: String,
    default: 'Guardar'
  }
})

const emit = defineEmits(['submit', 'cancel', 'close'])

const submit = () => emit('submit')
const cancel = () => {
  emit('cancel')
  emit('close')
}
</script>
