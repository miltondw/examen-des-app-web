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
/* Bootstrap overrides if needed */
</style>
