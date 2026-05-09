<template>
  <div class="container d-flex align-items-center justify-content-center" style="min-height:80vh;">
    <div class="card p-4" style="max-width:420px; width:100%">
      <h3 class="mb-3">Iniciar sesión</h3>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input v-model="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-primary">Entrar</button>
          <small class="text-muted">Demo: admin/admin123</small>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function submit() {
  error.value = ''
  try {
    const res = await fetch('/data/users.json')
    const users = await res.json()
    const found = users.find((u) => u.username === username.value && u.password === password.value)
    if (found) {
      // Nota: validacion educativa
      router.push('/dashboard')
    } else {
      error.value = 'Credenciales inválidas'
    }
  } catch (e) {
    error.value = 'Error cargando usuarios'
  }
}
</script>
