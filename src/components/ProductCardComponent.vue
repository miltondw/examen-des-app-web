<template>
  <div class="card h-100">
    <img :src="product.image" class="card-img-top" alt="" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text text-muted small">{{ product.genre }} • ${{ product.price }}</p>
      <p class="card-text">{{ product.description }}</p>
      <div class="mt-auto">
        <button class="btn btn-primary btn-sm me-2" @click="$emit('details', product)">Detalles</button>
        <button class="btn btn-outline-danger btn-sm" @click="$emit('delete', product)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ product: Object })
</script>

<style scoped>
.card-img-top { height: 120px; object-fit: cover }
</style>
