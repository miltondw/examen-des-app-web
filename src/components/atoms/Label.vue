<template>
  <label :class="['form-label', { 'fw-bold': bold }]" :for="forId">
    <slot />
    <span v-if="required" class="text-danger ms-1">*</span>
  </label>
</template>

<script setup>
defineProps({
  forId: {
    type: String,
    default: ''
  },
  bold: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.form-label {
  color: var(--gray-900, #111827);
  margin-bottom: 0.5rem;
  display: block;
}

.text-danger {
  color: var(--danger, #e74c3c);
}
</style>
