import { createRouter, createWebHistory } from "vue-router";

const LoginView = () => import("../views/LoginView.vue");
const DashboardView = () => import("../views/DashboardView.vue");
const ProductView = () => import("../views/ProductView/index.vue");
const UsersView = () => import("../views/UsersView.vue");
const ReservationsView = () => import("../views/ReservationsView.vue");

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/admin", redirect: "/dashboard" },
  { path: "/client", redirect: "/dashboard" },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/dashboard/peliculas" },
      { path: "peliculas", name: "Productos", component: ProductView },
      {
        path: "reservas",
        name: "Reservas",
        component: ReservationsView,
        meta: { requiresAdmin: true },
      },
      {
        path: "usuarios",
        name: "Usuarios",
        component: UsersView,
        meta: { requiresAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user") || "null");

  if (to.path === "/login" && currentUser) {
    return "/dashboard/peliculas";
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !currentUser) {
    return "/login";
  }

  if (to.matched.some((record) => record.meta.requiresAdmin) && currentUser?.role !== "admin") {
    return "/dashboard/peliculas";
  }

  return true;
});

export default router;
