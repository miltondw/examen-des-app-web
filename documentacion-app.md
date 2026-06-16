### 8.2 Introducción

Breve resumen del propósito de la aplicación.

La aplicación es un sistema de reservas de cine que permite a administradores gestionar películas, horarios y usuarios, y a clientes seleccionar funciones, escoger asientos y realizar reservas. Está diseñada para ofrecer una experiencia web sencilla con autenticación, gestión de datos y mensajes de estado claros mediante alertas Bootstrap.

### 8.3 Descripción del funcionamiento

- Flujo de Login  
  El usuario ingresa su usuario y contraseña en la pantalla de login. Si las credenciales son correctas, se guarda un usuario simulado en `localStorage` y se redirige al dashboard. Si hay error, se muestra una alerta de error.

- Flujo CRUD de Usuarios  
  El administrador puede ver la lista de usuarios, crear un nuevo usuario, editar datos existentes y eliminar usuarios. Cada acción de guardar/eliminar actualiza la lista y despliega una alerta de éxito o error según el resultado.

- Flujo CRUD de Productos  
  El administrador puede ver las películas disponibles, crear nuevas películas con horarios, editar películas existentes y eliminar películas. También hay un formulario modal para administrar los datos de la película y alertas que informan si la operación fue exitosa o si ocurrió un error.

- Protección de rutas  
  El acceso está protegido mediante la verificación del usuario almacenado en `localStorage`. Solo usuarios autenticados pueden entrar al dashboard y a las vistas internas. Además, los botones y opciones administrativas se muestran según el rol del usuario (`admin` o `client`).

- Uso de modales y alertas  
  La aplicación usa modales para formularios de creación/edición y confirmaciones de borrado. También emplea alertas Bootstrap para mostrar mensajes de estado en pantalla: errores de login, confirmaciones de CRUD, advertencias y mensajes informativos durante el uso.

### Pantallazos

Mínimo estos:

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
