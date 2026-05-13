<template>
  <aside class="bg-dark text-light p-3 h-100 rounded-3 shadow-sm position-sticky top-0 overflow-auto">
    <div class="small text-uppercase text-white-50 mb-3">
      Menú
    </div>
    <nav class="nav nav-pills flex-column gap-1">
      <MenuItem
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        :label="item.label"
        :icon="item.icon"
      />
    </nav>
    <div class="mt-4 pt-3 border-top border-secondary small text-white-50">
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
      { to: '/dashboard/reservas', label: 'Reservas', icon: '📋' }
    )
  }
  
  return baseItems
})
</script>
