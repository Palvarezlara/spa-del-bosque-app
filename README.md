# 🌿 SPA del Bosque — Plataforma Web Completa (React + Spring Boot + AWS)

Proyecto académico desarrollado para la **Evaluación final** de la asignatura **Desarrollo Fullstack 2 (DSY1104) - DuocUC**.  

El sistema corresponde a una **plataforma web funcional para un SPA**, con:

- Aplicación web creada con **React**
- Backend modular en **microservicios Spring Boot**
- API Gateway unificado
- CRUD completo de Servicios, usuarios y Blogs
- Panela de Administración
- Checkout con mock de generacion de reservas
- Persistencia real en **MySQL**
- Despliegue en **AWS EC2 + S3**

---

## 🧩 Objetivos del proyecto

- Migrar páginas estáticas HTML a React (componentes funcionales).
- Implementar un backend real en Java Spring Boot dividido en microservicios:
  - **User Service** (Usuarios, Perfil, Roles)
  - **Catalog Service** (Servicios del SPA y Blogs)
  - **Ventas / Checkout Service** (Ordenes y Reservas) Proximamente
  - **API Gateway** (Unificación de endpoints)
- Implementar CRUD + validaciones + estado global
- Construir un **panel administrador completo.**
- Integrar el frontend con APIs reales.
- Desplegar la arquitectura en AWS
 

---

## ⚙️ Tecnologías utilizadas 

### Frontend
- **React 18** + Vite
- Boostrap 5.3 + Boostrap Icons
- React Router DOM
- Context API (Auth, Carrito)
- Toast global
- Validaciones con reglas propias

### Backend
- Java 17 - Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Validation
- MySQL Driver
- API Gateway (Spring Cloud Gateway)

### Base de Datos
- MySQL 8
- Tablas reales para usuarios, servicios, blogs y órdenes.

### Infraestructura AWS
- **EC2** --> despliegue de microservicios via **systemd**
- **S3 Static Hosting** --> despliegue del frontend
- **S3 Media Bucket** --> Imágenes de servicios
  

---
## Arquitectura General 
```
┌──────────────────────┐
│      React SPA       │
│  (S3 Static Hosting) │
└───────────┬──────────┘
            │ HTTPS
┌───────────▼──────────────────────────────────────┐
│               API Gateway (8080)                 │
└───────┬────────────┬────────────────┬────────────┘
        │            │                │ 
 ┌──────▼───────┐ ┌──▼───────────┐ ┌──▼───────────┐
 │ User Service │ │ Catalog Svcs │ │  Ventas      │
 │   (8081)     │ │    (8083)    │ │  (8082)      │
 └──────┬───────┘ └───────┬──────┘ └──────┬───────┘
        │                 │               │ 
        └──────┬──────────────────────────┘
               ▼
      ┌──────────┐                ┌─────────────────┐    
      │  MySQL   │────────────────│  S3 spa-media   │
      └──────────┘                └─────────────────┘



```
## Enpoints Principales

#### User Service — /api/v1/users
| Método | Endpoint | Descripción |
|--------|--------------|---------|
| POST   | `/register`| Crear usuario|
| POST   | `/login`   | Autenticación simple|
| GET    | `/`        | Listar usuarios|
| GET    | `/{id}`    | Obtener usuario|
| PUT    | `/{id}`    | Actualizar datos del perfil|


#### Catalog Service — /api/v1/catalog/servicios
| Método | Endpoint | Descripción        |
| ------ | -------- | ------------------ |
| GET    | `/`      | Listar servicios   |
| GET    | `/{id}`  | Obtener servicio   |
| POST   | `/`      | Crear servicio     |
| PUT    | `/{id}`  | Modificar servicio |
| DELETE | `/{id}`  | Eliminar servicio  |


#### Ventas / Checkout Service — /api/v1/sales
| Método | Endpoint | Descripción |
|--------|--------------|---------|
| POST   | `/ordenes` | Crear venta|
| GET    | `/ordenes/usuario/{usuarioId}` | Historial de un usuario|
| GET    | `/ordenes` | Listar todas las ventas|
| GET    | `/ordenes/{id}` | Obtener venta por id|
| GET    | `/resumen` | Resumen simple para reporte|
| Patch  | `/ordenes/{id}/estado` | Actualizar estado|


### API Gateway (spa-gateway)
Todo el frontend consume URLs unificadas como:
- https://34.235.56.19/api/v1/users
- https://34.235.56.19/api/v1/catalog/servicios
- https://34.235.56.19/api/v1/ventas/ordenes

---
## 🧠 Principales funcionalidades

### 🏠 Home
Servicios destacados, CTA, accesos directos.

### Login y Registro
- Validación de correo y contraseñas
- Roles (CLIENTE, ADMIN)
- Autorización de rutas protegidas

### Servicios + ServicioDetalle
Consume datos desde spa-catalog-service.
  - Imágenes desde S3
  - Botón “Agregar al carrito”
  - Sección de servicios relacionados

### Contacto
Formulario validado en React:  
  - Nombre y correo con dominios permitidos (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`)  
  - Contador de caracteres del mensaje (máx. 500)  
  - Checkbox de aceptación de términos  
  - Persistencia de los mensajes enviados en `localStorage`

### Nosotros
Sección informativa con estructura modular:
  - Hero con imagen y texto introductorio  
  - Misión y Visión  
  - Valores corporativos  
  - Equipo de terapeutas, imagenes se consumen desde la S3
  - Línea de tiempo con hitos de la historia (Mock)

### Carrito y Checkout
- Manejo global del carrito
- Información del usuario precargada
- Datos enviados al microservicio de Ventas
- Simulación de pago
- Redirección a páginas de éxito / error
  
### Perfil del usuario
- Edición de datos personales
- Validación de fecha mínima (18 años)
- Selector de región y comunas dinámicas
- Carga de foto local (previsualización)
 
### Panel de Administración
Disponible solo para administradores.
 ### Módulos incluidos:
   - Dashboard
   - CRUD de Servicios
   - CRUD de Usuarios
   - CRUD de Blogs
   - Reportes (placeholder funcional)
---

## 🏗️ Estructura principal del proyecto

```
spa-del-bosque-app/
├── src/
│   ├── api/                     # Consumo de microservicios reales
│   │   ├── catalogApi.js
│   │   ├── userApi.js
│   │   ├── blogApi.js
│   │   ├── http.js
│   │   ├── httpClient.js
│   │   └── userApi.js
│   │   
│   ├── assets/                  # Recursos gráficos estáticos
│   │   ├── logo.webp
│   │   └── cdefault-avatar.webp
│   │    
│   │
│   ├── components/              # Componentes reutilizables de la aplicación
│   │   ├── about/               # Sección "Nosotros"
│   │   ├── auth/                # Login / Registro / Guards
│   │   ├── blog/                # Blog y detalle de publicaciones
│   │   └── Admin/               # Vistas del Dashboard del Admin
│   │       ├── blog/
│   │       ├── servicios/
│   │       └── usuarios/
│   │
│   ├── context/                 # Contextos globales de React
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── data/                    # Datos simulados y CRUD mock auxiliares
│   │   ├── api.js               # Fetch desde mockable.io o fallback local
│   │   ├── blogs.js             # Artículos del blog
│   │   ├── crudServicios.js     # Operaciones CRUD sobre los servicios mock
│   │   ├── data.js              # Base de datos simulada de servicios
│   │   ├── mockable.json        # Endpoints mockables
│   │   ├── regiones.js          # Constantes de regiones reales de Chile
│   │   └── store.js             # Persistencia auxiliar
│   │
│   ├── layout/
│   │   ├── AdminLayout.jsx      # Estructura general del Dashboard de Administración
│   │   └── AppLayout.jsx        # Estructura general (header + footer + toast)
│   │
│   ├── pages/                   # Páginas principales del sitio
│   │   ├── admin/               # Panel Admin
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
├── .env.production              # Variables de entorno 
├── index.html                   # HTML base de Vite
├── vite.config.js               # Configuración Vite
├── package.json                 # Dependencias y scripts
├── netlify.toml                 # Configuración para despliegue
└── README.md                    # Documentación del proyecto

```
---
## 🚀 Despliegue
### Frontend
El build se aloja en un bucket S3 con static hosting:
- https://spa-del-bosque-react.s3-website-us-east-1.amazonaws.com/

### Backend
Microservicios desplegados en EC2 t3.medium usando systemd --> .jar:

Ejemplo:
- `sudo systemctl restart spa-user.service`
- `sudo journalctl -fu spa-user.service`
  

## 🧪 Pruebas unitarias

Las pruebas se implementan con **Vitest** (entorno de pruebas para Vite) y, en los componentes que lo requieren, con **@testing-library/react**.
- Carga de componentes principales
- Validación de formularios  
- Renderizado condicional según estado del usuario  

Los reportes de cobertura se pueden generar ejecutando Vitest con la opción de cobertura.

---

## 🚀 Ejecución del proyecto

### Uso en producción (entorno nube)
El sistema está desplegado en AWS con la siguiente arquitectura:
  - Frontend React:
      - Desplegado como sitio estático en Amazon S3 (Static Website Hosting).
      - URL pública de acceso (ejemplo):
          - http://s3-pal-app-react.s3-website-us-east-1.amazonaws.com/
  - Backend (API REST):
      - 4 microservicios Spring Boot ejecutándose en una instancia EC2:
          - spa-user-service → gestión de usuarios (puerto 8081)
          - spa-catalog-service → catálogo de servicios y blogs (puerto 8082)
          - spa-sales-service → Ventas y detalle de ventas (puerto 8083)
          - spa-gateway → API Gateway (puerto 8080), único punto de entrada para el frontend.
      - Base de datos MySQL instalada en la misma EC2 (spa_backend_bd).
  - Comunicación frontend–backend:
      - El frontend consume los endpoints a través del Gateway usando la variable:
        ```
        // src/api/httpClient.js
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';        
        ```
      - En producción, el VITE_API_BASE_URL se construye apuntando a la IP / DNS público de la EC2, por ejemplo:
        ``` http://<IP_PUBLICA_EC2>:8080 ```
Para el usuario final, la “ejecución” del proyecto es simplemente navegar a la URL S3 y utilizar el sitio.
El backend ya está levantado como servicios systemd en la EC2.


### Ejecución local para desarrolladores
Esta sección explica cómo cualquier desarrollador puede clonar el proyecto y levantar backend + frontend en su máquina.

#### Requisitos previos
- Node.js 18+
- npm
- JDK 17
- Maven
- MySQL Server 8.x

#### Backend — microservicios Spring Boot
1. Clonar los repositorios:
   ```
   git clone https://github.com/Palvarezlara/spa-user-service
   git clone https://github.com/Palvarezlara/spa-catalog-service
   git clone https://github.com/Palvarezlara/spa-sales-service
   git clone https://github.com/Palvarezlara/spa-gateway

   ```
2. Crear base de datos local en MySQL:
   ```
   CREATE DATABASE spa_backend_bd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

   ```
3. Configurar credenciales en cada microservicio (application.properties o application.yml):
   ```
    spring.datasource.url=jdbc:mysql://localhost:3306/spa_backend_bd?useSSL=false&serverTimezone=UTC
    spring.datasource.username=root          # o el usuario que uses
    spring.datasource.password=tu_password
   ```
4. Ejecutar scripts de creación/carga inicial de los servicios en data.js en el frontend.
5. Levantar los microservicios (modo desarrollo):
   - En cada carpeta del servicio:
   ```
    # spa-user-service
    mvn spring-boot:run

    # spa-catalog-service
    mvn spring-boot:run

   # spa-salesservice
    mvn spring-boot:run
   
    
    # spa-gateway
    mvn spring-boot:run

   ```
   
   - Puertos esperados:
     - http://localhost:8081 → user
     - http://localhost:8082 → catalog
     - http://localhost:8083 → sales
     - http://localhost:8080 → gateway (/api/v1/...)
    
6. Probar salud básica con curl o navegador:
   ```
    curl http://localhost:8081/health
    curl http://localhost:8082/health
    curl http://localhost:8083/health
    curl http://localhost:8080/api/v1/catalog/servicios
   ```
   
### Frontend - aplicación React (Vite)
1. Clonar el repositorio del frontend:
   ```
   git clone https://github.com/Palvarezlara/spa-del-bosque-app
   cd spa-del-bosque-app
   ```
2. Configurar variable de entorno para usar el backend local:}
   Crea un archivo .env.local (o .env) en la raíz del frontend:
   ``` VITE_API_BASE_URL=http://localhost:8080 ```
   Si no creas el .env, el código ya tiene un fallback y usará http://localhost:8080 por defecto, pero es más explícito dejarlo configurado.
3. Instalar dependencias:
  ``` npm install ```
4. Levantar en modo desarrollo:
   ``` npm run dev ```
   Por defecto Vite usa http://localhost:5173.
   
   Con backend local corriendo, ya podrás:
   1. Registrarte y loguearte.
   2. Ver el catálogo de servicios desde MySQL.
   3. Usar el panel admin (/admin) con rol ADMIN.
   4. Probar el flujo de checkout simulado.
5. Ejecutar pruebas unitarias (Vitest):  ``` npm run test ```
6. Generar build de producción local:
   ```
   npm run build
   npm run preview   # para probar el build localmente

   ```
### Build para despliegue en la nube
Para generar un nuevo build apuntando al backend de la EC2:
1. Define la URL del gateway:
    ```
   # En Linux/macOS
    VITE_API_BASE_URL=http://<IP_PUBLICA_EC2>:8080 npm run build
    
    # En Windows (PowerShell)
    $env:VITE_API_BASE_URL="http://<IP_PUBLICA_EC2>:8080"
    npm run build

   ```
2. Sube el contenido de la carpeta dist/ al bucket S3 configurado con Static Website Hosting.

   
---
Autoría

Pamela Álvarez Lara
Carrera: Ingeniería en Informática — Duoc UC
Asignatura: DSY1104 — Desarrollo Fullstack II
Docente: Prof. Javier Peña


