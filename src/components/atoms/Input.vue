<template>
  <input 
    :class="['form-control', { 'form-control-sm': size === 'sm', 'form-control-lg': size === 'lg' }]"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :required="required"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  type: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'email', 'password', 'number', 'date', 'time'].includes(v)
  },
  placeholder: {
    type: String,
    default: ''
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
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-control {
  border-radius: 6px;
  border: 1px solid var(--gray-300, #d1d5db);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: var(--primary, #2c3e50);
  box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}

.form-control:disabled {
  background-color: var(--gray-100, #f3f4f6);
  cursor: not-allowed;
}
</style>
