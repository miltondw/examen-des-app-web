<template>
  <component 
    :is="tag"
    :class="[
      {
        'fw-bold': bold,
        'text-muted': muted,
        'text-center': center
      },
      sizeClass
    ]"
    :style="customStyle"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'p',
    validator: (v) => ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  bold: {
    type: Boolean,
    default: false
  },
  muted: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const sizeClass = computed(() => {
  return {
    xs: 'fs-6',
    sm: 'fs-6',
    md: 'fs-5',
    lg: 'fs-4',
    xl: 'fs-3'
  }[props.size] || ''
})
</script>

<style scoped>
/* Bootstrap handles all styling */
</style>
