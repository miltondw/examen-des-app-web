<template>
  <div :class="['alert', `alert-${type}`, { 'alert-dismissible': dismissible }, 'fade', 'show']" role="alert">
    <div class="d-flex align-items-start gap-2">
      <div class="flex-grow-1">
        <slot />
      </div>
      <button
        v-if="dismissible"
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
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

defineEmits(['close'])
</script>
