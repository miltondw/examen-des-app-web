📘 EXAMEN FINAL – DESARROLLO DE APLICACIONES WEB
Construcción de una Aplicación Web con Vue.js, Bootstrap 5 y MockAPI
Modalidad: Trabajo en grupos de 2 estudiantes (Los mismos grupos del segundo parcial)
________________


1. Presentación
El presente examen final corresponde al curso de Desarrollo de Aplicaciones Web y sistemas operativos, y tiene como propósito evaluar las competencias adquiridas en la construcción de aplicaciones front-end modernas empleando Vue.js, Bootstrap 5, Vue Router, modales, alertas, manejo de APIs, autenticación básica y gestión de estados en el navegador.
Esta actividad integradora permite que el estudiante diseñe, implemente y documente una aplicación funcional, respondiendo a las necesidades planteadas y aplicando buenas prácticas de desarrollo web.
________________


2. Objetivo General
Desarrollar una aplicación web modularizada empleando Vue.js y Bootstrap 5, conectada a una API falsa (MockAPI), que permita gestionar Usuarios y Productos mediante operaciones CRUD, autenticación de usuario, rutas protegidas, y el uso de componentes de interfaz interactivos como modales, alertas e íconos.
________________


3. Competencias a Desarrollar
Al finalizar este examen el estudiante será capaz de:
* Desarrollar aplicaciones web SPA empleando Vue.js 3.
* Consumir y gestionar datos mediante APIs REST (MockAPI).
* Implementar autenticación básica y proteger rutas con Vue Router.
* Utilizar Bootstrap 5 para crear interfaces modernas y funcionales.
* Construir modales para creación, edición y eliminación de recursos.
* Implementar alertas visuales para retroalimentación del usuario.
* Utilizar repositorios públicos en GitHub para control de versiones.
* Generar documentación formal con evidencias y pantallazos.
________________


4. Instrucciones Generales de la Actividad
1. El trabajo se realiza en grupos de 2 estudiantes (Los mismos grupos del segundo parcial). Pueden reutilizar el mismo repositorio del segundo parcial pero deben renombrarlo asi: examen-des-app-web
2. Los estudiantes desarrollarán una Single Page Application (SPA) con Vue.js.
3. La aplicación debe ser totalmente funcional y conectarse a una API creada en MockAPI con dos recursos: usuarios y productos.
4. La entrega final será un PDF que contenga:
   * Portada con los integrantes del grupo
   * Introducción del proyecto
   * Descripción técnica
   * Evidencias (pantallazos)
   * Tecnologías utilizadas
   * URL del repositorio en GitHub
5. La aplicación debe desplegarse en un repositorio público en github.
6. Se califican: funcionalidad, calidad del código, documentación, diseño, cumplimiento de requisitos.
7. Sustentación técnica
________________


5. Requerimientos Funcionales (Obligatorios)
La aplicación debe cumplir con los siguientes requisitos mínimos:
5.1 Autenticación de Usuario
* Debe existir un formulario de Inicio de sesión (Login).
* Las credenciales deben consultarse en el recurso creado en mockapi para validar si el usuario y contraseña son validos
* Al autenticarse, el sistema debe guardar un token simulado en sessionStorage o localStorage.
* Debe existir un botón o menú para cerrar sesión.
5.2 Rutas Protegidas
* El usuario no autenticado debe ser redirigido automáticamente a /login.
* Las vistas de Usuarios y Productos solo deben ser accesibles si hay sesión activa.
* Usar navigation guards de Vue Router.
5.3 CRUD de Usuarios
Debe implementarse:
* Listado de usuarios
* Creación de usuario mediante modal
* Edición mediante modal
* Eliminación con modal de confirmación
* Uso de alertas (Bootstrap) después de cada operación
* Consumo de una API creada en MockAPI
5.4 CRUD de Productos
Debe incluir:
* Listado de productos
* Modal para crear
* Modal para editar
* Modal para confirmar eliminación
* Íconos y alertas donde corresponda
* Consultas a MockAPI
5.5 Uso de Bootstrap 5
Debe aplicarse:
* Sistema de grid / responsive para que se adapte a cualquier dispositivo
* Formularios estilizados
* Modales para interacción CRUD
* Alertas de error, éxito o validación
* Íconos de Bootstrap Icons en botones o títulos de sección

Ejemplos:
 ✔ ícono de lápiz para editar
 ✔ ícono de bote de basura para eliminar
✔ ícono de más (+) para crear nuevo recurso
________________


6. Requerimientos No Funcionales
   * Diseño limpio, ordenado y responsivo.
   * Buen uso de componentes reutilizables.
   * Manejo adecuado de estados y errores.
   * Adecuada organización del proyecto (carpetas, componentes, servicios, rutas).
   * Buenas prácticas de codificación y comentarios.
   * Documentación en el readme del repositorio
________________


7. Estructura mínima recomendada del proyecto
(Solo conceptual, sin código)
   * /src

      * /components

      * /views

      * /router

      * /services (servicios para consumir MockAPI)

      * /assets

      * App.vue

      * main.js
________________


8. Entregable Final (Formato PDF)
El PDF debe contener:
8.1 Portada
         * Nombre del proyecto
         * Integrantes del grupo
         * Curso y fecha
8.2 Introducción
Breve resumen del propósito de la aplicación.
8.3 Descripción del funcionamiento
         * Flujo de Login
         * Flujo CRUD de Usuarios
         * Flujo CRUD de Productos
         * Protección de rutas
         * Uso de modales y alertas
8.4 Pantallazos
Mínimo estos:
         1. Login
         2. Listado de Usuarios
         3. Modal Crear Usuario
         4. Modal Editar Usuario
         5. Modal Eliminar Usuario
         6. Listado de Productos
         7. Modal Crear Producto
         8. Modal Editar Producto
         9. Modal Confirmar Eliminación
         10. Alertas en funcionamiento
8.5 Tecnologías utilizadas
         * Vue.js 3
         * Vue Router
         * Bootstrap 5 / Bootstrap Icons
         * Axios
         * MockAPI
         * Git y GitHub
8.6 URL del Repositorio Público de GitHub
Debe permitir visualizar el proyecto completo.
8.7 Conclusiones del grupo
Breve reflexión.
________________


9. Rúbrica de Evaluación
Criterio
	Descripción
	Peso
	Estructura modular y trabajo colaborativo
	Organización clara del proyecto y uso de GitHub
	10%
	Calidad del diseño UI-UX
	El buen uso de ventanas modales, alertas e íconos es fundamental en el diseño de interfaces (UI/UX) para garantizar una comunicación clara y evitar la frustración del usuario
	20%
	Protección de rutas y autenticación
	Mecanismos de ciberseguridad encargados de verificar la identidad de los usuarios y restringir su acceso a áreas sensibles
	15%
	Buenas prácticas de código y modularización
	Convenciones, legibilidad y comentarios
	5%
	Documentación (PDF y pantallazos)
	Realización del documento con la información solicitada.
	10%
	Sustentación técnica
	Claridad, dominio y demostración funcional
	40%
