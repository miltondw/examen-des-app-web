# Cine Leonelda — App demo (Vue 3 + Vite)

Pequeña aplicación de ejemplo para gestionar una cartelera / inventario de peliculas.

Objetivo: aplicar modularización, componentización y simular las cuatro operaciones CRUD usando LocalStorage.

Importante: la validación de usuarios se hace contra un archivo JSON local y solo es educativa — no es autenticación segura.

Estructura principal (resumen):

- `src/components` — componentes reutilizables (Navbar, Sidebar, Footer, ProductCard)
- `src/views` — vistas/páginas (LoginView, DashboardView, ProductView)
- `src/router` — configuración de rutas (vue-router)
- `src/services` — servicios para simular API (apiService.js)
- `public/data` — archivos JSON con datos iniciales (`users.json`, `products.json`)

Rutas principales:

- `/login` — vista de inicio de sesión
- `/dashboard` — panel principal
- `/dashboard/peliculas` — gestión de peliculas / productos (CRUD)

División de trabajo y branches (sugerido):

- `feature/estructura` — scaffolding y estructura base (actual)
- `feature/auth` — implementar mejoras de login, manejo de sesiones, mensajes
- `feature/components` — mejorar y testear componentes reutilizables
- `feature/products` — pulir ProductView, validaciones, imágenes, filtros
- `feature/styles` — integrar paleta y ajustes de Bootstrap

Para ejecutar localmente:

```bash
npm install
npm run dev
```

Notas de implementación:

- Los datos iniciales se encuentran en `public/data/products.json` y `public/data/users.json`.
- El servicio `src/services/apiService.js` carga `products.json` la primera vez y luego opera sobre `localStorage` para simular CRUD.
- Comunicación entre componentes: `ProductCardComponent` emite eventos `details` y `delete` hacia su padre.
