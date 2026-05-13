<template>
  <div class="form-field">
    <Label :forId="id" :required="required">
      {{ label }}
    </Label>
    <Input 
      v-if="type !== 'select'"
      :id="id"
      :modelValue="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <Select 
      v-else
      :modelValue="modelValue"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <small v-if="error" class="text-danger d-block mt-1">{{ error }}</small>
    <small v-if="hint" class="text-muted d-block mt-1">{{ hint }}</small>
  </div>
</template>

<script setup>
import Label from '@/components/atoms/Label.vue'
import Input from '@/components/atoms/Input.vue'
import Select from '@/components/atoms/Select.vue'

defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  type: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'email', 'password', 'number', 'date', 'time', 'select'].includes(v)
  },
  inputType: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
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
.form-field {
  margin-bottom: 1rem;
}

.text-danger {
  color: var(--danger, #e74c3c);
  font-size: 0.875rem;
}

.text-muted {
  color: var(--gray-500, #6b7280);
  font-size: 0.875rem;
}
</style>
