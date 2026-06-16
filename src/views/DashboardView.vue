<template>
  <div class="min-vh-100 d-flex flex-column">
    <Header />
    <div class="container-fluid flex-grow-1 py-3">
      <div class="row g-3 h-100">
        <div class="col-12 col-lg-auto">
          <Sidebar />
        </div>
        <div class="col-12 col-lg">
          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <div class="row row-cols-1 row-cols-md-3 g-3">
                <div class="col">
                  <StatCard label="Películas" :value="productsCount" subtitle="Títulos disponibles" />
                </div>
                <div class="col">
                  <StatCard label="Usuarios" :value="usersCount" subtitle="Cuentas registradas" />
                </div>
                <div class="col">
                  <StatCard label="Reservas" :value="reservationsCount" subtitle="Reservas totales" />
                </div>
              </div>
            </div>
          </div>

          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <router-view />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Header, Sidebar, Footer, StatCard } from '@/components'
import * as api from '@/services/apiService'

const productsCount = ref(0)
const usersCount = ref(0)
const reservationsCount = ref(0)

async function loadStats() {
  const [products, users, reservations] = await Promise.all([
    api.getProducts(),
    api.getUsers(),
    api.getReservations(),
  ])

  productsCount.value = products.length
  usersCount.value = users.length
  reservationsCount.value = reservations.length
}

onMounted(loadStats)
</script>
