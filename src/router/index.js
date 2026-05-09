import { createRouter, createWebHistory } from "vue-router";

const LoginView = () => import("../views/LoginView.vue");
const DashboardView = () => import("../views/DashboardView.vue");
const ProductView = () => import("../views/ProductView.vue");

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: LoginView },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    children: [
      { path: "", redirect: "/dashboard/peliculas" },
      { path: "peliculas", name: "Peliculas", component: ProductView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
