### Diagrama de Flujo de la Aplicación

```mermaid
graph LR
    subgraph Navegador
        A(Usuario)
    end

    subgraph Frontend [Angular en localhost:4200]
        B(Componente Vista)
        C(Servicio API)
    end

    subgraph Backend [Node.js en localhost:3000]
        D(API REST - index.js)
        E(Lógica SQL - queries.js)
    end

    subgraph Base de Datos
        F(PostgreSQL)
    end

    A --> B;
    B --> C;
    C -- HTTP Request (GET/POST/PUT/DELETE) --> D;
    D --> E;
    E -- SQL Query --> F;
    F -- SQL Response --> E;
    E --> D;
    D -- JSON Response --> C;
    C --> B;
    B --> A;
````






# Prueba Técnica Full Stack (Node.js + Angular)

Solución a la prueba técnica para Desarrollador Full Stack. Este repositorio contiene un proyecto **monorepo** con dos carpetas principales:

* `/back`: Una API REST (microservicio) en **Node.js + Express** conectada a PostgreSQL.
* `/front`: Una aplicación de cliente en **Angular + Angular Material** que consume la API.

---

## 1. Justificación de Arquitectura

Durante el análisis de los requisitos, se identificaron dos puntos clave que requirieron una decisión de arquitectura:

### Conflicto: Node.js vs. JAVA

* **El Desafío:** Las instrucciones solicitaban un backend principal en `Node.js + Express` y el uso de la librería `pg` (driver de Node para Postgres). Sin embargo, un punto separado indicaba que "JAVA se debe crear un crud".
* **La Solución:** Se tomó la decisión de implementar el **CRUD completo en Node.js**.
* **Justificación:** Esta decisión se basa en el requisito explícito de usar la librería `pg`. Dado que `pg` es un driver exclusivo de Node.js, se infiere que la intención era que Node manejara toda la lógica de la base de datos. Esta arquitectura unifica el backend, cumple con el 95% de los requisitos técnicos (Express, `pg`, Angular) y provee una API REST única y coherente para el frontend.

### Estructura del Backend: Capas Simples

* **El Desafío:** Un patrón MVC completo (con carpetas para `controllers`, `repositories`, `entities`) sería una sobre-ingeniería para un microservicio con una sola entidad (`usuarios`).
* **La Solución:** Se optó por un **patrón de capas simple**, que es más ágil y mantiene una clara separación de responsabilidades:
    * `index.js`: Actúa como la **Capa de Control y Rutas**. Define los endpoints de la API y maneja las peticiones HTTP.
    * `queries.js`: Actúa como la **Capa de Servicio y Repositorio**. Centraliza toda la lógica de negocio y las consultas SQL, separándolas de la capa de rutas.
    * `db.js`: Es la **Capa de Configuración**, que gestiona el pool de conexiones a la base de datos de forma eficiente.

---

## 2. Tecnologías Utilizadas

* **Backend:** Node.js, Express, Cors, pg (node-postgres)
* **Frontend:** Angular (Standalone Components), Angular Material, TypeScript
* **Base de Datos:** PostgreSQL
* **DevTools:** Nodemon (para recarga en vivo del backend)

---

## 3. Configuración de la Base de Datos

Antes de ejecutar el proyecto, se requiere una configuración única:

1.  Asegurarse de tener **PostgreSQL** instalado y corriendo.
2.  Crear una base de datos. (Ej: `prueba_tecnica`).
3.  Conectarse a esa base de datos y ejecutar el siguiente script SQL para crear la tabla `usuarios`:

    ```sql
    CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        correo VARCHAR(100),
        edad INT
    );
    ```

4.  **¡IMPORTANTE!** Editar el archivo `back/db.js` y actualizar el campo `password` (y `user`/`database` si es necesario) con sus credenciales locales de PostgreSQL.

---

## 4. Ejecución del Proyecto

Este es un *monorepo*. Deberá abrir **dos terminales separadas** para ejecutar el backend y el frontend.

### Terminal 1: Backend (Node.js)

```bash
# 1. Navegar a la carpeta del backend
cd back

# 2. Instalar las dependencias
npm install

# 3. Iniciar el servidor en modo desarrollo (con reinicio automático)
npm run dev

# 4. La aplicación se abrirá automáticamente en su navegador en http://localhost:3000.



# 1. (En la segunda terminal) Navegar a la carpeta del frontend
# (La estructura de carpetas es /front/front/)
cd front/front

# 2. Instalar las dependencias
npm install

# 3. Iniciar la aplicación de Angular
ng serve

# 4. La aplicación se abrirá automáticamente en su navegador en http://localhost:4200.

## 5. Diseño y Features Destacados

* **API REST Completa:** Todos los endpoints del CRUD (GET, POST, PUT, DELETE) están implementados y funcionales.
* **Diseño 100% Responsive:** La aplicación se visualiza correctamente en dispositivos móviles.
* **UI Adaptativa:** En pantallas de escritorio o tablet, los usuarios se muestran en una `mat-table`. En pantallas móviles (menos de 768px), la tabla se reemplaza por una lista de `mat-card` individuales, evitando el scroll horizontal y mejorando la experiencia de usuario.

---

## 6. Guía de Endpoints (Postman)

La API puede ser probada directamente con Postman en la URL base `http://localhost:3000`.

| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/data` | Obtiene **todos** los usuarios. | N/A |
| `GET` | `/api/usuarios/:id` | Obtiene un usuario por su `id`. | N/A |
| `POST` | `/api/usuarios` | Crea un nuevo usuario. | `{ "nombre": "...", "correo": "...", "edad": ... }` |
| `PUT` | `/api/usuarios/:id` | Actualiza un usuario existente por `id`. | `{ "nombre": "...", "correo": "...", "edad": ... }` |
| `DELETE` | `/api/usuarios/:id` | Elimina un usuario por su `id`. | N/A |



