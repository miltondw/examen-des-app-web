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
/* Bootstrap handles styling */
</style>
