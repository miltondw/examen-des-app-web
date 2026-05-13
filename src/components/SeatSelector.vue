<template>
  <div class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content seat-selector-modal">
        <div class="modal-header">
          <div>
            <h5 class="modal-title mb-0">Selecciona asientos</h5>
            <p class="text-muted small mb-0">Horario: {{ showtimeDisplay }}</p>
          </div>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
            <span class="badge text-bg-secondary">Disponible</span>
            <span class="badge text-bg-success">Seleccionado</span>
            <span class="badge text-bg-danger">Ocupado</span>
          </div>
          <p class="small text-muted mb-3">Los asientos ocupados están en rojo. Puedes elegir varios antes de confirmar.</p>
          <div class="seat-grid-wrap">
            <div v-for="r in rows" :key="r" class="d-flex flex-wrap justify-content-center gap-2">
              <button
                v-for="c in cols"
                :key="c"
                type="button"
                class="btn seat-btn"
                :class="seatClass(r, c)"
                @click="toggleSeat(r, c)"
              >
                {{ r }}-{{ c }}
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" @click="$emit('close')">Cancelar</button>
          <button class="btn btn-primary" :disabled="selected.length === 0" @click="confirm">
            Confirmar compra ({{ selected.length }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatShowtime } from '../utils/time'

const props = defineProps({ occupied: Array, showtime: Object })
const emit = defineEmits(['close', 'confirm'])

const showtimeDisplay = computed(() => {
  if (typeof props.showtime === 'object' && props.showtime?.time) return formatShowtime(props.showtime.time)
  return formatShowtime(props.showtime)
})

const rows = [1,2,3,4,5]
const cols = [1,2,3,4,5,6,7,8]
const selected = ref([])

function seatKey(r,c){ return `${r}-${c}` }

function isOccupied(r,c){
  return (props.occupied || []).includes(seatKey(r,c))
}

function seatClass(r,c){
  const k = seatKey(r,c)
  if (isOccupied(r,c)) return 'btn-danger disabled'
  if (selected.value.includes(k)) return 'btn-success'
  return 'btn-outline-secondary'
}

function toggleSeat(r,c){
  const k = seatKey(r,c)
  if (isOccupied(r,c)) return
  const i = selected.value.indexOf(k)
  if (i === -1) selected.value.push(k)
  else selected.value.splice(i,1)
}

function confirm(){
  emit('confirm', selected.value.slice())
}
</script>

<style scoped>
.seat-selector-modal .modal-body {
  background: #f8fafc;
}

.seat-grid-wrap {
  max-height: 60vh;
  overflow: auto;
  padding: 0.5rem 0.25rem;
}

.seat-btn { min-width: 3.25rem; }
</style>
