<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h2>Peliculas / Productos</h2>
        <p class="text-muted small">CRUD simulado con LocalStorage (seed desde products.json)</p>
      </div>
      <div>
        <button class="btn btn-success" @click="openCreate">+ Nuevo</button>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Titulo</th>
          <th>Genero</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.title }}</td>
          <td>{{ p.genre }}</td>
          <td>${{ p.price }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-2" @click="startEdit(p)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="remove(p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showForm" class="card p-3 mt-3">
      <h5>{{ editId ? 'Editar' : 'Crear' }} pelicula</h5>
      <form @submit.prevent="save">
        <div class="row g-2">
          <div class="col-md-6">
            <input v-model="form.title" class="form-control" placeholder="Titulo" required />
          </div>
          <div class="col-md-3">
            <input v-model="form.genre" class="form-control" placeholder="Genero" required />
          </div>
          <div class="col-md-3">
            <input v-model.number="form.price" class="form-control" placeholder="Precio" required />
          </div>
        </div>
        <div class="row g-2 mt-2">
          <div class="col-md-3">
            <input v-model.number="form.stock" class="form-control" placeholder="Stock" required />
          </div>
          <div class="col-md-9">
            <input v-model="form.image" class="form-control" placeholder="URL imagen" />
          </div>
        </div>
        <div class="mt-3">
          <button class="btn btn-primary me-2">Guardar</button>
          <button type="button" class="btn btn-secondary" @click="closeForm">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/apiService'

const products = ref([])
const showForm = ref(false)
const editId = ref(null)
const form = ref({ title: '', genre: '', price: 0, stock: 0, image: '', description: '' })

async function load() {
  products.value = await api.getProducts()
}

onMounted(load)

function openCreate() {
  editId.value = null
  form.value = { title: '', genre: '', price: 0, stock: 0, image: '', description: '' }
  showForm.value = true
}

function startEdit(p) {
  editId.value = p.id
  form.value = { ...p }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

async function save() {
  if (editId.value) {
    await api.updateProduct(editId.value, form.value)
  } else {
    await api.createProduct(form.value)
  }
  showForm.value = false
  await load()
}

async function remove(id) {
  if (!confirm('Eliminar este producto?')) return
  await api.deleteProduct(id)
  await load()
}

export default { }
</script>
