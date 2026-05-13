<template>
  <div class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="$emit('confirm')">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Confirmar acción' },
  message: { type: String, default: '¿Deseas continuar?' },
})

defineEmits(['close', 'confirm'])
</script>