<template>
  <div class="min-vh-100 d-flex flex-column">
    <Header />
    <div class="container-fluid flex-grow-1 py-3">
      <div class="row g-3 h-100">
        <div class="col-12 col-lg-auto">
          <Sidebar />
        </div>
        <div class="col-12 col-lg">
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
import { Header, Sidebar, Footer } from '@/components'
</script>
