<template>
  <div class="movies-grid">
    <div v-if="filteredMovies.length === 0" class="alert alert-info">
      <Text>No se encontraron películas con los criterios de búsqueda.</Text>
    </div>
    
    <div v-else class="row g-4">
      <div v-for="movie in filteredMovies" :key="movie.id" class="col-12 col-sm-6 col-lg-4">
        <MovieCard
          :movie="movie"
          :showShowtimes="showShowtimes"
          :selectedShowtime="selectedShowtimes[movie.id] || ''"
          :buttonText="buttonText"
          :buttonVariant="buttonVariant"
          @update:showtimeId="handleSelectShowtime(movie.id, $event)"
          @action="$emit('card-action', { movieId: movie.id, showtimeId: selectedShowtimes[movie.id] })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import MovieCard from '@/components/molecules/MovieCard.vue'
import Text from '@/components/atoms/Text.vue'

defineProps({
  movies: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
  showShowtimes: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: 'Reservar'
  },
  buttonVariant: {
    type: String,
    default: 'primary'
  }
})

defineEmits(['card-action'])

const selectedShowtimes = reactive({})

const filteredMovies = computed(() => {
  if (!searchQuery) return movies
  
  const query = searchQuery.toLowerCase()
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(query) ||
    movie.genre.toLowerCase().includes(query) ||
    movie.description.toLowerCase().includes(query)
  )
})

const handleSelectShowtime = (movieId, showtimeId) => {
  selectedShowtimes[movieId] = showtimeId
}
</script>

<style scoped>
.movies-grid {
  padding: 2rem 0;
}

.row {
  margin-left: 0;
  margin-right: 0;
}

.col-12,
.col-sm-6,
.col-lg-4 {
  padding: 1rem;
}

.alert {
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background: var(--gray-100, #f3f4f6);
  border: 1px solid var(--gray-200, #e5e7eb);
}
</style>
