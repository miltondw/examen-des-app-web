<template>
  <button 
    :class="['btn', `btn-${variant}`, { 'btn-sm': size === 'sm', 'btn-lg': size === 'lg' }, customClass]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline-light', 'outline-secondary'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button',
    validator: (v) => ['button', 'submit', 'reset'].includes(v)
  },
  customClass: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}
</style>
