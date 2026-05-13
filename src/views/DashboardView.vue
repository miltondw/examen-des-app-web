<template>
  <div class="min-vh-100 d-flex flex-column">
    <NavbarComponent />
    <div class="container-fluid flex-grow-1 py-3">
      <div class="row g-3 h-100">
        <div class="col-12 col-lg-auto">
          <SidebarComponent />
        </div>
        <div class="col-12 col-lg">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <router-view />
            </div>
          </div>
          <FooterComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
</script>
