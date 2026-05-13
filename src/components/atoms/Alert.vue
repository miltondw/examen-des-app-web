<template>
  <div :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show']" role="alert">
    <div class="d-flex align-items-start gap-2">
      <div>
        <slot />
      </div>
      <button 
        type="button" 
        class="btn-close" 
        @click="$emit('close')"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (v) => ['primary', 'info', 'success', 'warning', 'danger'].includes(v)
  }
})

defineEmits(['close'])
</script>

<style scoped>
.alert {
  border-radius: 8px;
  border: 1px solid;
}

.alert-primary {
  background: #d1e4f7;
  border-color: #a8cff0;
  color: #0c3d7a;
}

.alert-info {
  background: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
}

.alert-success {
  background: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.alert-warning {
  background: #fff3cd;
  border-color: #ffeaa7;
  color: #856404;
}

.alert-danger {
  background: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.btn-close {
  cursor: pointer;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1.5rem;
  opacity: 0.7;
}

.btn-close:hover {
  opacity: 1;
}
</style>
