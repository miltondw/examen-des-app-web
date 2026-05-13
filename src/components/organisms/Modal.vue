<template>
  <div 
    v-if="isOpen"
    class="modal-overlay"
    @click.self="close"
  >
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between align-items-center mb-3">
        <Text tag="h5" bold>{{ title }}</Text>
        <button 
          class="btn-close"
          @click="close"
          aria-label="Close"
        ></button>
      </div>
      
      <div class="modal-body">
        <slot />
      </div>
      
      <div v-if="$slots.footer" class="modal-footer d-flex gap-2 justify-content-end mt-4">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Text from '@/components/atoms/Text.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

defineEmits(['close'])

const close = () => emit('close')
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-close:hover {
  opacity: 1;
}

.modal-body {
  margin: 1rem 0;
}

.modal-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200, #e5e7eb);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--gray-100, #f3f4f6);
}

::-webkit-scrollbar-thumb {
  background: var(--gray-300, #d1d5db);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gray-400, #9ca3af);
}
</style>
