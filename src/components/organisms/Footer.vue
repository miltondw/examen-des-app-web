<template>
  <footer class="footer text-center py-3 mt-4 border-top border-light">
    <Text size="sm" muted>
      © 2026 Cine Leonelda. Todos los derechos reservados.
    </Text>
  </footer>
</template>

<script setup>
import Text from '@/components/atoms/Text.vue'
</script>

<style scoped>
.footer {
  background: var(--gray-50, #f9fafb);
  border-color: var(--gray-200, #e5e7eb) !important;
  margin-top: auto;
}
</style>
