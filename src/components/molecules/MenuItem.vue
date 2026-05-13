<template>
  <router-link
    :to="to"
    :class="[
      'menu-item',
      { 'menu-item-active': isActive }
    ]"
    :aria-current="isActive ? 'page' : undefined"
  >
    <span v-if="icon" class="menu-icon" aria-hidden="true">{{ icon }}</span>
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