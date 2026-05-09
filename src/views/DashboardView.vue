<template>
  <div>
    <NavbarComponent />
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-auto">
          <SidebarComponent />
        </div>
        <div class="col">
          <router-view />
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

<style scoped>
.col-auto { padding-left: 0 }
</style>
