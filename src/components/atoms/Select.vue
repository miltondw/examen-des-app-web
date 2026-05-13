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
.form-select {
  border-radius: 6px;
  border: 1px solid var(--gray-300, #d1d5db);
  transition: border-color 0.3s ease;
}

.form-select:focus {
  border-color: var(--primary, #2c3e50);
  box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}

.form-select:disabled {
  background-color: var(--gray-100, #f3f4f6);
  cursor: not-allowed;
}
</style>
