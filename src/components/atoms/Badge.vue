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
  display: inline-block;
}
</style>
