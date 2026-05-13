<template>
  <select 
    :class="['form-select', { 'form-select-sm': size === 'sm', 'form-select-lg': size === 'lg' }]"
    :value="modelValue"
    :disabled="disabled"
    :required="required"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array,
    required: true,
    validator: (v) => v.every(opt => opt.value && opt.label)
  },
  placeholder: {
    type: String,
    default: '-- Selecciona --'
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Bootstrap handles all styling */
</style>
