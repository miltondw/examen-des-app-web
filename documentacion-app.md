### 8.2 Introducción

La aplicación es una SPA construida con Vue 3 que funciona como un sistema de reservas de cine. Permite a administradores gestionar películas, horarios, usuarios y reservas, mientras que los clientes pueden seleccionar funciones, elegir asientos y confirmar reservas.

La lógica clave se divide en tres capas:
- Cliente: Vue 3 + Vue Router + componentes de UI.
- Servicios HTTP: `axios` contra un backend simulado en `mockapi.io`.
- Persistencia local: `localStorage` para almacenar la sesión del usuario.

### 8.3 Arquitectura y flujo de interacción

#### 8.3.1 Componentes principales

- `src/views/LoginView.vue`: maneja el ingreso de credenciales y la autenticación simulada.
- `src/router/index.js`: protege rutas según autenticación y rol.
- `src/services/apiService.js`: orquesta las llamadas HTTP a la API remota.
- `src/views/ProductView/index.vue`: controla la gestión de películas, reserva de asientos y visualización de detalles.
- `src/views/UsersView.vue`: gestiona CRUD de usuarios.
- `src/views/ReservationsView.vue`: muestra reservas agregadas por película y horario.

#### 8.3.2 Flujo lógico principal

1. El usuario abre la aplicación en el navegador y accede a `/login`.
2. En `LoginView.vue`, el cliente solicita la lista de usuarios con `GET /users`.
3. El cliente verifica localmente si las credenciales ingresadas coinciden con un usuario existente.
4. Si la autenticación es correcta, se guarda un objeto `current_user` en `localStorage` y se navega a `/dashboard/peliculas`.
5. El router valida la sesión en `router.beforeEach`: si no hay `current_user`, redirige a `/login`; si el usuario no es `admin` e intenta acceder a rutas administrativas, redirige a `/dashboard/peliculas`.
6. En el dashboard, el cliente carga datos con las APIs de productos, usuarios y reservas.
7. El administrador puede crear, editar y eliminar películas/usuarios mediante formularios modales.
8. Un cliente autenticado selecciona una película, elige un horario, selecciona asientos y confirma una reserva.
9. La reserva se guarda actualizando la película y también, cuando es posible, el usuario asociado.

#### 8.3.3 Secuencia de reserva (cliente)

- El cliente navega a la vista de películas y selecciona una película.
- Se abre un modal con los horarios disponibles.
- Al elegir un horario, el cliente solicita ocupación actual con `GET /movies/:id`.
- El selector de asientos muestra los asientos ya reservados y permite seleccionar hasta 6.
- El cliente confirma la selección.
- Se crea la reserva con `PUT /movies/:id` y se sincroniza el objeto `user` con `PUT /users/:id`.

### 8.4 Detalle técnico de las peticiones HTTP

Todas las llamadas usan `axios` con la base URL:

- `https://6a0e46811736097c3609a5f9.mockapi.io/api/v1`
- `headers`: `Content-Type: application/json`

#### Login / verificación de usuario

Acción del paso: Verificar credenciales de login
Método HTTP: GET
Endpoint: `/users`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros: ninguno
Respuesta esperada (Ejemplo):
```
[{
  "id": "1",
  "name": "Admin",
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}, {
  "id": "2",
  "name": "Cliente",
  "username": "user",
  "password": "user123",
  "role": "client"
}]
```
Código de estado esperado: `200`

#### Cargar lista de películas

Acción del paso: Obtener lista de películas
Método HTTP: GET
Endpoint: `/movies`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros: ninguno
Respuesta esperada (Ejemplo):
```
[{
  "id": "1",
  "title": "Película A",
  "genre": "Acción",
  "duration": 120,
  "rating": "PG-13",
  "image": "https://...",
  "description": "...",
  "showtimes": [{ "id": "st-1", "time": "19:00", "price": 25000, "availableSeats": 80 }],
  "reservations": []
}]
```
Código de estado esperado: `200`

#### Crear película

Acción del paso: Crear nuevo registro de película
Método HTTP: POST
Endpoint: `/movies`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros:
```
{
  "title": "Nueva película",
  "genre": "Drama",
  "duration": 100,
  "rating": "PG",
  "image": "https://...",
  "description": "Descripción...",
  "showtimes": [
    { "id": "st-123", "time": "19:00", "price": 20000, "availableSeats": 50 }
  ],
  "reservations": []
}
```
Respuesta esperada (Ejemplo):
```
{
  "id": "10",
  "title": "Nueva película",
  "genre": "Drama",
  "duration": 100,
  "rating": "PG",
  "image": "https://...",
  "description": "Descripción...",
  "showtimes": [...],
  "reservations": []
}
```
Código de estado esperado: `201`

#### Actualizar película

Acción del paso: Actualizar datos de una película existente
Método HTTP: PUT
Endpoint: `/movies/:id`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros:
```
{
  "title": "Película actualizada",
  "genre": "Comedia",
  "duration": 110,
  "rating": "PG-13",
  "image": "https://...",
  "description": "...",
  "showtimes": [...],
  "reservations": [...]
}
```
Respuesta esperada (Ejemplo):
```
{
  "id": "10",
  "title": "Película actualizada",
  "genre": "Comedia",
  "duration": 110,
  "rating": "PG-13",
  "image": "https://...",
  "description": "...",
  "showtimes": [...],
  "reservations": [...]
}
```
Código de estado esperado: `200`

#### Eliminar película

Acción del paso: Borrar película
Método HTTP: DELETE
Endpoint: `/movies/:id`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros: ninguno
Respuesta esperada (Ejemplo):
- `status`: `200` o `201`
- Cuerpo: respuesta vacía o el objeto eliminado según MockAPI

#### Obtener lista de usuarios

Acción del paso: Obtener usuarios registrados
Método HTTP: GET
Endpoint: `/users`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros: ninguno
Respuesta esperada (Ejemplo):
```
[{
  "id": "1",
  "name": "Admin",
  "username": "admin",
  "password": "admin123",
  "role": "admin",
  "reservations": []
}]
```
Código de estado esperado: `200`

#### Crear usuario

Acción del paso: Registrar un nuevo usuario
Método HTTP: POST
Endpoint: `/users`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros:
```
{
  "name": "Nombre",
  "username": "nuevo",
  "password": "secret",
  "role": "client",
  "reservations": []
}
```
Respuesta esperada (Ejemplo):
```
{
  "id": "5",
  "name": "Nombre",
  "username": "nuevo",
  "password": "secret",
  "role": "client",
  "reservations": []
}
```
Código de estado esperado: `201`

#### Actualizar usuario

Acción del paso: Modificar datos de usuario
Método HTTP: PUT
Endpoint: `/users/:id`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros:
```
{
  "name": "Nombre actualizado",
  "username": "usuario",
  "role": "admin",
  "password": "nuevoPassword"
}
```
Respuesta esperada (Ejemplo):
```
{
  "id": "2",
  "name": "Nombre actualizado",
  "username": "usuario",
  "role": "admin",
  "password": "nuevoPassword"
}
```
Código de estado esperado: `200`

#### Eliminar usuario

Acción del paso: Borrar usuario
Método HTTP: DELETE
Endpoint: `/users/:id`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros: ninguno
Respuesta esperada (Ejemplo):
- `status`: `200` o `201`
- Cuerpo: respuesta vacía o el objeto eliminado según MockAPI

#### Obtener reservas generales

Acción del paso: Listar reservas de todas las películas
Método HTTP: GET
Endpoint: `/movies`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros: ninguno
Respuesta esperada (Ejemplo):
```
[{
  "id": "1",
  "title": "Película A",
  "reservations": [{
    "id": "res-1",
    "movieId": "1",
    "movieTitle": "Película A",
    "showtime": "19:00",
    "seats": ["A1","A2"],
    "user": { "id": "2", "username": "user", "name": "Cliente" }
  }]
}]
```
Código de estado esperado: `200`

#### Obtener reservas de una película

Acción del paso: Consultar reservas de una película específica
Método HTTP: GET
Endpoint: `/movies/:id`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros: ninguno
Respuesta esperada (Ejemplo):
```
{
  "id": "1",
  "title": "Película A",
  "reservations": [{
    "id": "res-1",
    "movieId": "1",
    "movieTitle": "Película A",
    "showtime": "19:00",
    "seats": ["A1","A2"],
    "user": { "id": "2", "username": "user", "name": "Cliente" }
  }]
}
```
Código de estado esperado: `200`

#### Crear reserva

Acción del paso: Registrar una nueva reserva
Método HTTP: PUT
Endpoint: `/movies/:id`
Headers requeridos:
- `Content-Type: application/json`
Payload/Body o Parámetros:
```
{
  "id": "1",
  "title": "Película A",
  "showtimes": [...],
  "reservations": [
    {
      "id": "res-169...",
      "movieId": "1",
      "movieTitle": "Película A",
      "showtime": "19:00",
      "showtimePrice": 25000,
      "seats": ["A5","A6"],
      "user": { "id": "2", "username": "user", "name": "Cliente" },
      "createdAt": "2026-06-17T..."
    }
  ]
}
```
Respuesta esperada (Ejemplo):
```
{
  "id": "1",
  "title": "Película A",
  "reservations": [...]
}
```
Código de estado esperado: `200`

> Nota: El servicio también intenta sincronizar la reserva en el registro del usuario con `PUT /users/:id`.

### 8.5 Manejo de errores y casos borde

#### Autenticación y rutas
- `401 Unauthorized`: no existe `current_user` en `localStorage` o la sesión expiró. El router redirige automáticamente a `/login`.
- `403 Forbidden`: un usuario con rol `client` intenta acceder a rutas con `meta.requiresAdmin`; está redirigido a `/dashboard/peliculas`.
- Credenciales inválidas: si no hay coincidencia en la lista de usuarios, se muestra una alerta de error en `LoginView.vue`.

#### Errores de API
- `404 Not Found`: puede ocurrir al consultar o actualizar un `movie` o `user` por un `id` inexistente. El frontend maneja esto con `try/catch` y muestra un mensaje de error genérico.
- `500 Internal Server Error`: cualquier fallo de la API remota se captura y se convierte en alertas o logs en consola.
- `Network Error`: si la API no responde, se muestra `Error conectando con el servidor` en login o una alerta de error en los formularios.

#### Validaciones y casos de uso específicos
- Al crear usuario, la contraseña es obligatoria. Si falta, `UsersView.vue` lanza un error local y no envía la petición.
- Al reservar asientos, el cliente no puede seleccionar más de 6 asientos o 0 asientos.
- Si `movie.id` falta al cargar reservas, la app recarga la lista de películas y busca el `id` por título antes de consultar la API.
- Si la reserva no puede sincronizarse en el usuario debido a un error en la segunda llamada, el sistema sigue adelante con la reserva en la película y registra el error en consola.

### 8.6 Observaciones técnicas

- El backend no tiene autenticación real; la sesión se simula en el frontend leyendo el listado de usuarios.
- `apiService.js` normaliza los datos de `showtimes` y `reservations` para evitar errores cuando `MockAPI` devuelve estructuras incompletas.
- La aplicación usa componentes reutilizables (`FormModal`, `ConfirmDialog`, `Alert`, `Modal`) para mantener consistencia en UX.
- El estado de la sesión se mantiene en `localStorage.current_user`, no en un store global como Vuex.
- El flujo de reserva es principalmente cliente-centrado: la lógica de negocio se resuelve en `ProductView/index.vue` y `apiService.js`.

### 8.7 Pantallazos

1. Login — `src/views/LoginView.vue`
2. Listado de Usuarios — `src/views/UsersView.vue`
3. Modal Crear Usuario — `src/components/organisms/FormModal.vue`
4. Modal Editar Usuario — `src/components/organisms/FormModal.vue`
5. Modal Eliminar Usuario — `src/components/organisms/ConfirmDialog.vue`
6. Listado de Productos — `src/views/ProductView/index.vue`
7. Modal Crear Producto — `src/components/organisms/FormModal.vue`
8. Modal Editar Producto — `src/components/organisms/FormModal.vue`
9. Modal Confirmar Eliminación — `src/components/organisms/ConfirmDialog.vue`
10. Alertas en funcionamiento — `src/components/atoms/Alert.vue`, `src/views/UsersView.vue`, `src/views/ProductView/index.vue`, `src/views/LoginView.vue`
