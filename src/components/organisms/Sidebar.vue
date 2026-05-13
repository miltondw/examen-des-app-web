<template>
  <aside class="sidebar bg-dark text-light p-3 h-100">
    <div class="sidebar-title small text-uppercase text-white-50 mb-3">
      Menú
    </div>
    <nav class="sidebar-nav">
      <MenuItem 
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        :label="item.label"
        :icon="item.icon"
      />
    </nav>
    <div class="sidebar-footer mt-4 pt-3 border-top border-secondary small text-white-50">
      {{ currentUser?.role === 'admin' ? 'Panel administrador' : 'Panel cliente' }}
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import MenuItem from '@/components/molecules/MenuItem.vue'

const currentUser = computed(() => {
  const user = localStorage.getItem('current_user')
  return user ? JSON.parse(user) : null
})

const role = computed(() => currentUser.value?.role || 'cliente')

const menuItems = computed(() => {
  const baseItems = [
    { to: '/dashboard/peliculas', label: 'Películas', icon: '🎬' }
  ]
  
  if (role.value === 'admin') {
    baseItems.push(
      { to: '/dashboard/reservas', label: 'Reservaciones', icon: '📋' }
    )
  }
  
  return baseItems
})
</script>

<style scoped>
.sidebar {
  min-width: 220px;
  border-radius: 0.75rem;
  background: linear-gradient(180deg, var(--gray-900, #111827), var(--gray-800, #1f2937));
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
}

.sidebar-title {
  font-weight: 600;
  letter-spacing: 1px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-footer {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
