import { createRouter, createWebHistory } from "vue-router";

const LoginView = () => import("../views/LoginView.vue");
const ClientDashboardView = () => import("../views/ClientDashboardView.vue");
const AdminDashboardView = () => import("../views/AdminDashboardView.vue");

// Vistas de Cliente
const MoviesClientView = () => import("../views/Client/MoviesClientView.vue");
const SelectSeatsView = () => import("../views/Client/SelectSeatsView.vue");
const MyReservationsView = () => import("../views/Client/MyReservationsView.vue");

// Vistas de Admin
const MoviesAdminView = () => import("../views/Admin/MoviesAdminView.vue");
const ShowtimesAdminView = () => import("../views/Admin/ShowtimesAdminView.vue");
const SeatsAdminView = () => import("../views/Admin/SeatsAdminView.vue");
const ReservationsAdminView = () => import("../views/Admin/ReservationsAdminView.vue");

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: LoginView },
  
  // Rutas del Cliente
  {
    path: "/client",
    name: "ClientDashboard",
    component: ClientDashboardView,
    children: [
      { path: "", redirect: "/client/movies" },
      { path: "movies", name: "ClientMovies", component: MoviesClientView },
      { path: "select-seats/:movieId/:showtimeId", name: "SelectSeats", component: SelectSeatsView },
      { path: "my-reservations", name: "MyReservations", component: MyReservationsView },
    ],
  },

  // Rutas del Admin
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboardView,
    children: [
      { path: "", redirect: "/admin/movies" },
      { path: "movies", name: "AdminMovies", component: MoviesAdminView },
      { path: "showtimes", name: "AdminShowtimes", component: ShowtimesAdminView },
      { path: "seats", name: "AdminSeats", component: SeatsAdminView },
      { path: "reservations", name: "AdminReservations", component: ReservationsAdminView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
