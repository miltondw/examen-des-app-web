<template>
  <div class="stat-card bg-light rounded p-3 text-center">
    <Text size="sm" muted>{{ label }}</Text>
    <Text tag="h3" bold class="mb-0">{{ value }}</Text>
    <Text v-if="subtitle" size="xs" muted>{{ subtitle }}</Text>
  </div>
</template>

<script setup>
import Text from '@/components/atoms/Text.vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.stat-card {
  border: 1px solid var(--gray-200, #e5e7eb);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
