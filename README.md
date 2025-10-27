# 🌿 SPA del Bosque — Aplicación React

Proyecto académico desarrollado para la **Evaluación Parcial 2** de la asignatura **Desarrollo Fullstack 2 (DSY1104)**.  
El objetivo principal fue **migrar el sitio HTML estático a una aplicación React** con componentes reutilizables, validaciones, persistencia simulada y estructura modular.

---

## 🧩 Objetivos de la migración

✅ Migrar páginas estáticas HTML a React (componentes funcionales).  
✅ Incorporar Bootstrap 5 para diseño responsivo.  
✅ Implementar archivo de datos JS como fuente simulada.  
✅ Aplicar operaciones CRUD sobre datos mockeados.  
✅ Añadir validaciones y feedback visual al usuario.  
✅ Integrar toasts globales e interactividad con Context API.  

---

## ⚙️ Tecnologías utilizadas

| Tipo | Herramienta |
|------|--------------|
| **Framework** | React 18 (Vite) |
| **Estilos** | Bootstrap 5.3 + Bootstrap Icons |
| **Estado global** | React Context (AuthContext, CartContext) |
| **Persistencia simulada** | LocalStorage + data.js |
| **Notificaciones** | Custom Toast global |
| **Pruebas unitarias** | Jasmine + Karma (configurado) |
| **Librerías adicionales** | React Router DOM |

---

## 🏗️ Estructura principal del proyecto

```
spa-del-bosque/
├── public/
│   └── Productos/               # Imágenes de servicios y tratamientos
│       ├── relajacion.png
│       ├── descontracturante.png
│       ├── sauna.png
│       └── ...
│
├── src/
│   ├── assets/                  # Recursos gráficos estáticos
│   │   ├── blog/
│   │   ├── categorias/
│   │   └── terapeutas/
│   │
│   ├── components/              # Componentes reutilizables de la aplicación
│   │   ├── about/               # Sección "Nosotros"
│   │   ├── auth/                # Login / Registro / Guards
│   │   ├── blog/                # Blog y detalle de publicaciones
│   │   ├── contact/             # Formulario de contacto
│   │   └── layout/              # Navegación, Footer, Layout principal
│   │
│   ├── context/                 # Contextos globales de React
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── data/                    # Datos simulados y CRUD mock
│   │   ├── api.js               # Fetch desde mockable.io o fallback local
│   │   ├── blogs.js             # Artículos del blog
│   │   ├── crudServicios.js     # Operaciones CRUD sobre los servicios mock
│   │   ├── data.js              # Base de datos simulada de servicios
│   │   ├── mockable.json        # Endpoints mockables
│   │   └── store.js             # Persistencia auxiliar
│   │
│   ├── layout/
│   │   └── AppLayout.jsx        # Estructura general (header + footer + toast)
│   │
│   ├── pages/                   # Páginas principales del sitio
│   │   ├── Home.jsx
│   │   ├── Servicios.jsx
│   │   ├── ServicioDetalle.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Contacto.jsx
│   │   ├── Perfil.jsx
│   │   ├── Login.jsx
│   │   ├── Registro.jsx
│   │   ├── Blogs.jsx
│   │   ├── BlogDetalle.jsx
│   │   ├── Carrito.jsx
│   │   ├── Checkout.jsx
│   │   ├── CompraExitosa.jsx
│   │   ├── CompraError.jsx
│   │   └── NotFound.jsx
│   │
│   ├── styles/
│   │   └── theme.css            # Estilos base y variables del proyecto
│   │
│   ├── utils/
│   │   ├── formatters.js        # CLP formatter y categorías
│   │   └── toast.js             # Toast global para mensajes de usuario
│   │
│   ├── tests/                   # Pruebas unitarias (Jasmine + Karma)
│   │
│   ├── App.jsx                  # Definición de rutas y composición general
│   └── main.jsx                 # Punto de entrada principal
│
├── .env                         # Variables de entorno (mockable, etc.)
├── index.html                   # HTML base de Vite
├── vite.config.js                # Configuración Vite
├── package.json                 # Dependencias y scripts
├── netlify.toml                 # Configuración para despliegue
└── README.md                    # Documentación del proyecto

```
---

## 🧠 Principales funcionalidades

### 🏠 Home
Presenta los servicios destacados y accesos a categorías principales.

### 💆 Servicios
Listado general de servicios agrupados por categoría, con botones **Ver detalle** y **Agregar al carrito**.

### 🧾 ServicioDetalle
Muestra información detallada del servicio seleccionado.  
Incluye imagen, precio, duración y **servicios relacionados**.  
Permite agregar al carrito con feedback mediante **toast**.

### 👤 Perfil
Muestra los datos del usuario logueado (nombre, correo, teléfono, región, comuna)  
+ opción de cargar una foto local (previsualización).  

### 📞 Contacto
Formulario validado en React:  
- Nombre y correo con dominios permitidos (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`)  
- Contador de caracteres del mensaje (máx. 500)  
- Checkbox de aceptación de términos  
- Persistencia de los mensajes enviados en `localStorage`  

### 👥 Nosotros
Sección informativa con estructura modular:
- Hero con imagen y texto introductorio  
- Misión y Visión  
- Valores corporativos  
- Equipo de terapeutas  
- Línea de tiempo con hitos de la historia  

---

## 💾 Persistencia de datos (mock)

El archivo `src/data/data.js` actúa como **fuente de datos simulada**, representando una “base de datos” local con servicios del SPA.  
Además, se simulan operaciones CRUD en memoria o `localStorage`.

---

## 🧪 Pruebas unitarias

Se configuró el entorno de pruebas con **Jasmine + Karma**, cubriendo:
- Carga de componentes principales  
- Validación de formularios  
- Renderizado condicional según estado del usuario  

Los reportes de cobertura se exportan en `/coverage`.

---

## 🚀 Ejecución del proyecto

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar pruebas unitarias
npm test

# Compilar para producción
npm run build
```
---
Autoría

Pamela Álvarez Lara
Carrera: Ingeniería en Informática — Duoc UC
Asignatura: DSY1104 — Desarrollo Fullstack II
Docente: Prof. Javier Peña

Este proyecto representa la migración total del SPA del Bosque desde un sitio estático HTML a una aplicación modular React con validaciones, persistencia simulada y diseño responsivo.
