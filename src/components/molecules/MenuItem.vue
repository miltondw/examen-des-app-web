<template>
  <router-link
    :to="to"
    :class="[
      'nav-link d-flex align-items-center gap-2 rounded-3 px-3 py-2 text-white',
      { 'active bg-primary text-white': isActive, 'text-white-50': !isActive }
    ]"
    :aria-current="isActive ? 'page' : undefined"
  >
    <span v-if="icon" aria-hidden="true">{{ icon }}</span>
    <span>{{ label }}</span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>