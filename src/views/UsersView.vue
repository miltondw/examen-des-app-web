<template>
  <div class="container-fluid px-0">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div>
        <h2 class="h3 mb-1">Usuarios</h2>
        <p class="text-muted mb-0">Gestiona usuarios, roles y acceso a la aplicación.</p>
      </div>
      <button class="btn btn-success" @click="openCreate">
        <i class="bi bi-person-plus me-2"></i>Nuevo usuario
      </button>
    </div>

    <div v-if="alertMessage" class="mb-4">
      <Alert :type="alertType" @close="alertMessage = ''">{{ alertMessage }}</Alert>
    </div>

    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th class="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>
                <span class="badge" :class="user.role === 'admin' ? 'bg-primary' : 'bg-secondary'">
                  {{ user.role }}
                </span>
              </td>
              <td class="text-end">
                <button class="btn btn-outline-primary btn-sm me-2" @click="startEdit(user)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="askDelete(user)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="4" class="text-center text-muted py-4">No hay usuarios registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <FormModal v-if="showForm" :isOpen="showForm" :title="editId ? 'Editar usuario' : 'Nuevo usuario'" submitText="Guardar usuario" @close="closeForm" @submit="saveUser(userForm)">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">Nombre completo</label>
          <input v-model="userForm.name" class="form-control" type="text" required />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">Usuario</label>
          <input v-model="userForm.username" class="form-control" type="text" required />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">Contraseña</label>
          <input v-model="userForm.password" class="form-control" :placeholder="editId ? 'Dejar en blanco para no cambiar' : 'Ingrese contraseña'" type="password" :required="!editId" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">Rol</label>
          <select v-model="userForm.role" class="form-select" required>
            <option value="admin">Admin</option>
            <option value="client">Cliente</option>
          </select>
        </div>
      </div>
    </FormModal>

    <ConfirmDialog
      v-if="showDeleteModal"
      :isOpen="showDeleteModal"
      :message="`¿Eliminar a ${deleteTarget?.name}? Esta acción no se puede deshacer.`"
      confirmText="Eliminar"
      confirmVariant="danger"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Alert, FormModal, ConfirmDialog } from '@/components'
import * as api from '@/services/apiService'

function createEmptyUser() {
  return {
    name: '',
    username: '',
    password: '',
    role: 'client'
  }
}

const users = ref([])
const showForm = ref(false)
const editId = ref(null)
const editingUser = ref(createEmptyUser())
const userForm = editingUser
const alertMessage = ref('')
const alertType = ref('success')
const showDeleteModal = ref(false)
const deleteTarget = ref(null)

async function loadUsers() {
  users.value = await api.getUsers()
}

onMounted(loadUsers)

function openCreate() {
  editId.value = null
  editingUser.value = createEmptyUser()
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function startEdit(user) {
  editId.value = user.id
  editingUser.value = {
    ...user,
    password: ''
  }
  showForm.value = true
}

async function saveUser(form) {
  alertMessage.value = ''
  try {
    const payload = {
      name: form.name,
      username: form.username,
      role: form.role
    }

    if (form.password) {
      payload.password = form.password
    }

    if (editId.value) {
      await api.updateUser(editId.value, payload)
      alertType.value = 'success'
      alertMessage.value = 'Usuario actualizado correctamente.'
    } else {
      if (!form.password) {
        throw new Error('La contraseña es obligatoria para crear usuario.')
      }
      await api.createUser(payload)
      alertType.value = 'success'
      alertMessage.value = 'Usuario creado correctamente.'
    }
  } catch (error) {
    console.error(error)
    alertType.value = 'danger'
    alertMessage.value = error?.message || 'Error guardando usuario. Intenta nuevamente.'
  } finally {
    showForm.value = false
    await loadUsers()
  }
}

function askDelete(user) {
  deleteTarget.value = user
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deleteTarget.value = null
}

async function confirmDelete() {
  try {
    await api.deleteUser(deleteTarget.value.id)
    alertType.value = 'success'
    alertMessage.value = 'Usuario eliminado correctamente.'
  } catch (error) {
    console.error(error)
    alertType.value = 'danger'
    alertMessage.value = 'Error eliminando usuario.'
  } finally {
    closeDeleteModal()
    await loadUsers()
  }
}
</script>
