<template>
  <span :class="['badge', `bg-${variant}`, textClass]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light'].includes(v)
  },
  textClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.badge {
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.85rem;
  display: inline-block;
}
</style>
