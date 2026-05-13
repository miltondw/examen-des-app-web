# 📐 Atomic Design - Estructura de Componentes

## Cambios Realizados

La carpeta `src/components/` ha sido completamente refactorizada siguiendo la **metodología Atomic Design**, organizando componentes en 3 niveles jerárquicos:

---

## 📂 Estructura Nueva

```
src/components/
├── atoms/                      # Elementos indivisibles
│   ├── Button.vue             # Botones reutilizables
│   ├── Badge.vue              # Insignias/etiquetas
│   ├── Input.vue              # Campos de entrada
│   ├── Select.vue             # Selectores
│   ├── Label.vue              # Etiquetas de formulario
│   ├── Card.vue               # Tarjetas base
│   ├── Alert.vue              # Alertas
│   ├── Image.vue              # Imágenes optimizadas
│   └── Text.vue               # Componentes de texto
├── molecules/                  # Combinación de átomos
│   ├── FormField.vue          # Campo de formulario completo (Label + Input/Select)
│   ├── MovieCard.vue          # Tarjeta de película (Image + Info + Button)
│   ├── StatCard.vue           # Tarjeta de estadísticas
│   ├── SeatRow.vue            # Fila de asientos
│   └── MenuItem.vue           # Item de menú
├── organisms/                  # Secciones completas
│   ├── Header.vue             # Navbar superior
│   ├── Sidebar.vue            # Menú lateral (antes: SidebarComponent)
│   ├── Footer.vue             # Pie de página
│   ├── Modal.vue              # Modal base
│   ├── SeatSelector.vue       # Grid de asientos (antes: SeatSelector)
│   ├── MoviesGrid.vue         # Grid de películas
│   ├── ConfirmDialog.vue      # Modal de confirmación
│   └── FormModal.vue          # Modal con formulario
├── index.js                    # Exports centralizados
└── [OLD FILES]                 # Componentes antiguos (a eliminar)
    ├── NavbarComponent.vue     → Header.vue
    ├── SidebarComponent.vue    → Sidebar.vue
    ├── FooterComponent.vue     → Footer.vue
    ├── ProductCardComponent.vue → MovieCard.vue
    ├── ConfirmModal.vue        → ConfirmDialog.vue
    ├── MovieModal.vue          → FormModal.vue
    ├── ProductFormModal.vue    → FormModal.vue
    └── SeatSelector.vue        → SeatSelector.vue (organism)
```

---

## 🎯 Clasificación de Componentes

### ÁTOMOS (9)
Elementos indivisibles sin dependencias de otros componentes locales:

| Componente | Propósito | Props principales |
|-----------|----------|------------------|
| **Button** | Botón reutilizable | variant, size, disabled, type, customClass |
| **Badge** | Insignia de estado | variant, textClass |
| **Input** | Campo de entrada | modelValue, type, placeholder, size, disabled, required |
| **Select** | Selector dropdown | modelValue, options, placeholder, disabled, required |
| **Label** | Etiqueta de formulario | forId, bold, required |
| **Card** | Contenedor de tarjeta | shadow, hover |
| **Alert** | Mensaje de alerta | type (primary/info/success/warning/danger) |
| **Image** | Imagen optimizada | src, alt, aspectRatio, customStyle |
| **Text** | Componente de texto | tag, size, bold, muted, center, customStyle |

### MOLÉCULAS (5)
Combinación de átomos con lógica simple:

| Componente | Composición | Props principales |
|-----------|-----------|------------------|
| **FormField** | Label + (Input ó Select) | id, label, modelValue, type, options, error, hint |
| **MovieCard** | Image + Text + Badge + Button | movie, showShowtimes, selectedShowtime, buttonText, buttonVariant |
| **StatCard** | Text + Stat | label, value, subtitle |
| **SeatRow** | Múltiples botones de asiento | rowLetter, occupiedSeats, selectedSeats |
| **MenuItem** | Router-link estilizado | to, label, icon |

### ORGANISMOS (8)
Secciones completas con lógica y composición compleja:

| Componente | Propósito | Composición |
|-----------|----------|-----------|
| **Header** | Navbar principal | Button + Badge + Text (atoms) |
| **Sidebar** | Menú lateral | MenuItem x N (molecules) |
| **Footer** | Pie de página | Text (atom) |
| **Modal** | Modal base | Header + Close button + Slot (atom: Button) |
| **SeatSelector** | Grid 8x12 de asientos | SeatRow x 8 (molecules) + Legend + Text |
| **MoviesGrid** | Grid de películas | MovieCard x N (molecules) |
| **ConfirmDialog** | Modal de confirmación | Modal (organism) + Button (atoms) |
| **FormModal** | Modal con formulario | Modal (organism) + Form + Button (atoms) |

---

## 📋 Reglas Aplicadas

✅ **Átomos**: No importan otros componentes locales  
✅ **Moléculas**: Solo importan átomos  
✅ **Organismos**: Pueden importar átomos y moléculas  
✅ **Imports**: Usan alias `@/components/` para rutas absolutas  
✅ **Lógica**: No cambió, solo se reorganizó en nueva estructura  

---

## 🔄 Migración de Componentes Antiguos

### Mapeo 1:1

| Componente Antiguo | Nuevo Equivalente | Ubicación | Cambios |
|------------------|-----------------|----------|--------|
| NavbarComponent.vue | Header.vue | organisms | Refactorizado con átomos Button, Badge, Text |
| SidebarComponent.vue | Sidebar.vue | organisms | Refactorizado con moléculas MenuItem |
| FooterComponent.vue | Footer.vue | organisms | Refactorizado con átomo Text |
| ProductCardComponent.vue | MovieCard.vue | molecules | Refactorizado con átomos Image, Text, Badge, Select |
| SeatSelector.vue | SeatSelector.vue | organisms | Refactorizado con moléculas SeatRow |
| ConfirmModal.vue | ConfirmDialog.vue | organisms | Refactorizado con organismos Modal y átomos Button |
| MovieModal.vue | FormModal.vue | organisms | Refactorizado con organismos Modal |
| ProductFormModal.vue | FormModal.vue | organisms | Refactorizado con organismos Modal |

---

## 📥 Ejemplo de Importación

### ❌ Antes (antiguo)
```javascript
import NavbarComponent from '@/components/NavbarComponent.vue'
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
```

### ✅ Después (nuevo)
```javascript
import { Header, Sidebar, Footer, MovieCard } from '@/components'
// O imports específicos:
import Header from '@/components/organisms/Header.vue'
import MovieCard from '@/components/molecules/MovieCard.vue'
import Button from '@/components/atoms/Button.vue'
```

---

## 🎨 Ejemplo: Refactorización de MovieCard

### Antes (ProductCardComponent.vue)
```vue
<template>
  <div class="card movie-card">
    <img :src="movie.image" :alt="movie.title" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{ movie.title }}</h5>
      <span class="badge bg-info">{{ movie.genre }}</span>
      <span class="badge bg-secondary">{{ movie.duration }}m</span>
      <p class="card-text">{{ truncatedDesc }}</p>
      <p class="rating">★ {{ movie.rating }}/10</p>
      <button class="btn btn-primary" @click="$emit('action')">Reservar</button>
    </div>
  </div>
</template>
```

### Después (MovieCard.vue - molecule)
```vue
<template>
  <Card class="movie-card" :hover="true">
    <template #header>
      <Image 
        :src="movie.image"
        :alt="movie.title"
        aspectRatio="16:9"
      />
    </template>
    
    <Text tag="h5" bold>{{ movie.title }}</Text>
    
    <div class="movie-meta d-flex gap-2 mb-2">
      <Badge variant="info">{{ movie.genre }}</Badge>
      <Badge variant="secondary">{{ movie.duration }}m</Badge>
    </div>

    <Text size="sm" muted>{{ truncateDescription }}</Text>
    <Text size="sm" bold><span class="text-danger">★ {{ movie.rating }}/10</span></Text>

    <Button 
      variant="primary"
      customClass="w-100"
      @click="$emit('action')"
    >
      Reservar
    </Button>
  </Card>
</template>
```

---

## 🚀 Próximos Pasos

1. **Actualizar imports en vistas** (src/views/)
2. **Eliminar componentes antiguos** de src/components/
3. **Validar funcionamiento** de la aplicación
4. **Crear unit tests** para los nuevos componentes

---

## 📝 Notas Importantes

- ✅ Toda la lógica de negocio se mantiene intacta
- ✅ Los estilos se conservan con mejoras
- ✅ Componentes completamente reutilizables
- ✅ Fácil mantenimiento y escalabilidad
- ✅ Estructura lista para testing

---

**Creado**: 2026  
**Framework**: Vue 3 + Bootstrap 5  
**Patrón**: Atomic Design  
