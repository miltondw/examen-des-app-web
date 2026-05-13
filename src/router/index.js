import { createRouter, createWebHistory } from "vue-router";

const LoginView = () => import("../views/LoginView.vue");
const DashboardView = () => import("../views/DashboardView.vue");
const ProductView = () => import("../views/ProductView.vue");

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/admin", redirect: "/dashboard" },
  { path: "/client", redirect: "/dashboard" },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      { path: "", redirect: "/dashboard/peliculas" },
      { path: "peliculas", name: "Peliculas", component: ProductView },
      {
        path: "reservas",
        name: "Reservas",
        component: () => import("../views/ReservationsView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const currentUser = JSON.parse(
    localStorage.getItem("current_user") || "null",
  );

  if (to.path === "/login" && currentUser) {
    return "/dashboard/peliculas";
  }

  if (to.path.startsWith("/dashboard") && !currentUser) {
    return "/login";
  }

  if (currentUser?.role === "client" && to.path === "/dashboard/reservas") {
    return "/dashboard/peliculas";
  }

  return true;
});

export default router;
