<template>
  <img
    :src="src"
    :alt="alt"
    :class="['img-fluid', sizeClass]"
    :style="customStyle"
    @error="onImageError"   
  />
</template>


<script setup>
import { computed } from 'vue'  

function onImageError(e) {
  e.target.src = '/icons.svg'   // usa el SVG que ya tienes en /public
  e.target.style.objectFit = 'contain'
  e.target.style.padding = '1rem'
  e.target.style.background = '#f3f4f6'
}

const props = defineProps({      
  src: { type: String, required: true },
  alt: { type: String, default: 'Imagen' },
  aspectRatio: {
    type: String,
    default: 'auto',
    validator: (v) => ['auto', '1:1', '16:9', '4:3', '3:2'].includes(v)
  },
  customStyle: { type: Object, default: () => ({}) }
})

const sizeClass = computed(() => {   
  return {
    '1:1': 'ratio-1x1',
    '16:9': 'ratio-16x9',
    '4:3': 'ratio-4x3',
    '3:2': 'ratio-3x2'
  }[props.aspectRatio] || ''
})
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}

.ratio-1x1 {
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.ratio-16x9 {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.ratio-4x3 {
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.ratio-3x2 {
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
</style>
