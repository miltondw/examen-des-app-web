<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="/dashboard/peliculas">
        Cine Leonelda
      </router-link>
      <div class="ms-auto d-flex align-items-center gap-3">
        <Text tag="span" size="sm" muted class="d-none d-sm-inline">
          {{ currentUser?.name || currentUser?.username || 'Invitado' }}
        </Text>
        <Badge variant="secondary" class="text-uppercase">
          {{ role }}
        </Badge>
        <Button 
          variant="outline-light"
          size="sm"
          @click="logout"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/atoms/Button.vue'
import Badge from '@/components/atoms/Badge.vue'
import Text from '@/components/atoms/Text.vue'

const router = useRouter()

const currentUser = computed(() => {
  const user = localStorage.getItem('current_user')
  return user ? JSON.parse(user) : null
})

const role = computed(() => currentUser.value?.role || 'cliente')

function logout() {
  localStorage.removeItem('current_user')
  router.push('/login')
}
</script>

<style scoped>
.navbar-brand {
  font-weight: 700;
  font-size: 1.5rem;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
