<template>
  <div :class="['card', { shadow: shadow, 'card-hover': hover }]">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  shadow: {
    type: Boolean,
    default: true
  },
  hover: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
}
</style>
