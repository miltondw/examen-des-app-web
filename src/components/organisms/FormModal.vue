<template>
  <Modal 
    :isOpen="isOpen"
    :title="title"
    @close="cancel"
  >
    <form @submit.prevent="submit" class="form">
      <slot />
    </form>
    
    <template #footer>
      <Button 
        variant="secondary"
        @click="cancel"
      >
        Cancelar
      </Button>
      <Button 
        variant="primary"
        type="submit"
        @click="submit"
      >
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

defineEmits(['submit', 'cancel'])

const submit = () => emit('submit')
const cancel = () => emit('cancel')
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
