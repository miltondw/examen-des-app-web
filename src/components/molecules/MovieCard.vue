<template>
  <Card class="movie-card" :hover="true">
    <template #header>
      <Image 
        :src="movie.image"
        :alt="movie.title"
        aspectRatio="16:9"
      />
    </template>
    
    <Text tag="h5" bold>{{ movie.title }}</Text>
    
    <div class="movie-meta d-flex gap-2 mb-2">
      <Badge variant="info" class="text-uppercase text-white">{{ movie.genre }}</Badge>
      <Badge variant="secondary" class="text-uppercase text-white">{{ movie.duration }}m</Badge>
    </div>

    <Text size="sm" muted class="mb-2">{{ truncateDescription }}</Text>

    <Text size="sm" bold class="mb-3">
      <span class="text-danger">★ {{ movie.rating }}/10</span>
    </Text>

    <div v-if="showShowtimes" class="showtimes-section mb-3">
      <Text size="sm" bold>Horarios</Text>
      <Select 
        v-if="movie.showtimes?.length"
        :modelValue="selectedShowtime"
        :options="showtimeOptions"
        placeholder="Selecciona horario"
        @update:modelValue="$emit('update:showtimeId', $event)"
      />
      <Text v-else size="sm" muted>Sin horarios disponibles</Text>
    </div>

    <Button 
      :variant="buttonVariant"
      customClass="w-100"
      @click="$emit('action')"
    >
      {{ buttonText }}
    </Button>
  </Card>
</template>

<!-- src/components/molecules/MovieCard.vue -->
<script setup>
import { computed } from 'vue'
import Card     from '@/components/atoms/Card.vue'
import Image    from '@/components/atoms/Image.vue'
import Text     from '@/components/atoms/Text.vue'
import Badge    from '@/components/atoms/Badge.vue'
import Select   from '@/components/atoms/Select.vue'
import Button   from '@/components/atoms/Button.vue'

const props = defineProps({      
  movie: {
    type: Object,
    required: true,
    validator: (v) => v.id && v.title && v.image
  },
  showShowtimes: { type: Boolean, default: false },
  selectedShowtime: { type: [String, Number], default: '' },
  buttonText: { type: String, default: 'Reservar' },
  buttonVariant: { type: String, default: 'primary' }
})

defineEmits(['update:showtimeId', 'action'])

const truncateDescription = computed(() => {
  const desc = props.movie.description || ''   
  return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
})

const showtimeOptions = computed(() => {
  return (props.movie.showtimes || []).map(st => ({   
    value: st.id,
    label: `${st.time} — $${st.price}`
  }))
})
</script>
<style scoped>
.movie-card {
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.movie-meta {
  flex-wrap: wrap;
}

.showtimes-section {
  border-top: 1px solid var(--gray-200, #e5e7eb);
  padding-top: 1rem;
}

.text-danger {
  color: var(--danger, #e74c3c);
}
</style>
