# TODO - Proyecto Cine Leonelda

Estado del scaffold: la estructura base ya está creada en la rama `feature/estructura`.

## Tareas completadas

- [x] Scaffold del proyecto (componentes, vistas, router, servicios, datos)
- [x] `public/data/users.json` y `public/data/products.json` (seed)
- [x] `src/services/apiService.js` (CRUD simulado con LocalStorage)
- [x] `src/router/index.js` y rutas básicas (`/login`, `/dashboard`, `/dashboard/peliculas`)
- [x] Vistas principales: `LoginView.vue`, `DashboardView.vue`, `ProductView.vue`
- [x] Componentes reutilizables: `NavbarComponent.vue`, `SidebarComponent.vue`, `FooterComponent.vue`, `ProductCardComponent.vue`
- [x] `README.md` actualizado con estructura y tareas sugeridas

## Tareas pendientes (priorizadas)

### Infra / dependencias

- [ ] Ejecutar `npm install` para instalar dependencias nuevas (`vue-router`, `bootstrap`) y confirmar `package.json` final

### Autenticación y UX

- [ ] `feature/auth`: Mejorar `LoginView` — almacenar sesión simulada, mensajes de error, guardas de navegación (route guards)
- [ ] Proteger rutas del `dashboard` (guardas simples que revisen sesión en LocalStorage)

### Componentes y UI

- [ ] `feature/components`: Refactorizar `ProductCardComponent` y separar modal de detalles
- [ ] Añadir tests básicos (opcional)

### Productos (CRUD avanzado)

- [ ] `feature/products`: Añadir filtros por género, paginación y búsqueda
- [ ] Implementar subida de imágenes (simulada) y validaciones en el formulario
- [ ] Añadir confirmaciones y alertas con Bootstrap para acciones (crear/editar/eliminar)

### Estilos y accesibilidad

- [ ] `feature/styles`: Integrar variables de Bootstrap (SCSS) y definir paleta corporativa
- [ ] Mejorar contraste, focus states y soporte responsive (auditoría rápida)

### Opcionales / mejoras futuras

- [ ] `feature/api` (opcional): Conectar a una API externa real (ejemplo en README)
- [ ] Selección de asientos y flujo de compra (UX)

## División sugerida por personas (2 integrantes)

- Persona A (ej. tú): `feature/auth`, `feature/products`
  - Mejoras en login, guardas, validar UX
  - CRUD avanzado, filtros, paginación y validaciones

- Persona B (coequipo): `feature/components`, `feature/styles`
  - Componentes reutilizables, modales, tests unitarios
  - Integración de la paleta de colores y variables de Bootstrap (preferible usar SCSS)

Notas:

- No crear ramas desde mi cuenta: cada integrante debe crear su rama localmente y empujarla al remoto.
- Para ejecutar el proyecto localmente:

```bash
npm install
npm run dev
```

- Recordatorio en `README.md`: la validación de usuarios es solo educativa y no representa un sistema de autenticación real.

Si quieres, actualizo este `todo.md` con nombres reales y asignaciones exactas. ¿Asignamos nombres y prioridades ahora?
