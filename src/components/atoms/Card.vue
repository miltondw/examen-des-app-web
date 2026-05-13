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
  border: none;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
}

.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
}

.card-header {
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
  border-radius: 8px 8px 0 0;
  background: var(--gray-50, #f9fafb);
  padding: 1rem;
}

.card-body {
  padding: 1rem;
}

.card-footer {
  border-top: 1px solid var(--gray-200, #e5e7eb);
  border-radius: 0 0 8px 8px;
  background: var(--gray-50, #f9fafb);
  padding: 1rem;
}
</style>
