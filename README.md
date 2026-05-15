# Antigüedades Sthandier

> Tu portal hacia el pasado: elegancia, historia y piezas únicas en un solo lugar.

**Antigüedades Sthandier** es una plataforma web moderna diseñada para la exhibición y consulta de piezas históricas y objetos de colección. Beneficia tanto a coleccionistas como a entusiastas del arte, ofreciendo un catálogo interactivo con una experiencia de usuario fluida y estética.

---

## Tabla de Contenidos

- [Instalación y configuración](#instalación-y-configuración)
- [Uso](#uso)
- [API y Endpoints](#api-y-endpoints)
- [Desarrollo y pruebas](#desarrollo-y-pruebas)
- [Docker](#docker)
- [Despliegue y CI](#despliegue-y-ci)
- [Contribuir](#contribuir)
- [Seguridad y buenas prácticas](#seguridad-y-buenas-prácticas)
- [Licencia y contacto](#licencia-y-contacto)
- [Extras](#extras)

---

## Instalación y configuración

### Requisitos previos

- **Node.js**: v18.0.0 o superior.
- **NPM**: v9.0.0 o superior.
- **Git**: Para control de versiones.

### Clonar repositorio

```bash
git clone https://github.com/frederickiribarren/antiguedades-sthandier.git
cd antiguedades-sthandier
```

### Variables de entorno

Crea un archivo `.env` basado en el siguiente ejemplo:

```env
# Configuración del servidor (si aplica)
VITE_API_URL=http://localhost:5173
VITE_APP_NAME="Antigüedades Sthandier"

# Claves de terceros (opcional)
VITE_MAPS_API_KEY=tu_clave_aqui
```

### Instalación de dependencias

```bash
npm install
```

### Migraciones y seeders

_Nota: Este proyecto es principalmente frontend. Los datos se manejan de forma local o mediante archivos JSON._
Si se integra con una base de datos en el futuro:

```bash
# Ejemplo si fuera Laravel o Node-Sequelize
npm run db:migrate
npm run db:seed
```

### Iniciar en desarrollo

```bash
# Iniciar servidor de desarrollo de Vite
npm run dev
```

El proyecto estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## Uso

### Cómo ejecutar

1. Asegúrate de tener instaladas las dependencias.
2. Ejecuta `npm run dev`.
3. Abre tu navegador en el puerto indicado.

### Ejemplos de uso

- **Selección de productos**: Navega a la sección de productos, selecciona las piezas de tu interés y dirígete al formulario de contacto para realizar una consulta automática.
- **Navegación fluida**: Haz clic en el menú superior para desplazarte suavemente entre secciones sin recargar la página.

### Credenciales de prueba

_Este proyecto no requiere autenticación obligatoria para la navegación general._

- **Usuario**: `admin@sthandier.com`
- **Contraseña**: `password123` (Solo para futuras áreas administrativas).

---

## API y Endpoints

Aunque el proyecto es mayoritariamente frontend, se sugieren los siguientes endpoints para la integración:

| Método | Ruta                 | Parámetros           | Descripción                          |
| ------ | -------------------- | -------------------- | ------------------------------------ |
| GET    | `/api/productos`     | `categoria`          | Obtiene el catálogo de antigüedades. |
| GET    | `/api/productos/:id` | `id`                 | Detalles de una pieza específica.    |
| POST   | `/api/contacto`      | `nombre, email, msg` | Envía un formulario de contacto.     |
| GET    | `/api/preguntas`     | -                    | Obtiene la lista de FAQ.             |

**Ejemplo de respuesta JSON (`GET /api/productos`):**

```json
[
  {
    "id": 1,
    "nombre": "Reloj de Bolsillo Oro 18k",
    "descripcion": "Reloj suizo del siglo XIX...",
    "precio": 1200,
    "imagen": "/img/reloj-oro.jpg"
  }
]
```

---

## Desarrollo y pruebas

### Scripts útiles

- `npm run dev`: Inicia el entorno de desarrollo.
- `npm run build`: Genera los archivos optimizados para producción en la carpeta `dist`.
- `npm run preview`: Previsualiza la build de producción.
- `npm run lint`: Ejecuta el linter (ESLint) para verificar la calidad del código.

### Tests

```bash
# Ejecutar tests unitarios (si están configurados con Vitest o Jest)
npm run test
```

### Linters y Formateadores

Se recomienda el uso de **ESLint** (ya configurado) y **Prettier** para mantener la consistencia del código.

---

## Docker (opcional)

Puedes levantar el entorno de desarrollo usando Docker:

**docker-compose.yml**

```yaml
services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

---

## Despliegue y CI

### Despliegue en producción

El proyecto está configurado para desplegarse en **GitHub Pages**:

```bash
npm run deploy
```

### CI con GitHub Actions

Ejemplo de pipeline básico (`.github/workflows/ci.yml`):

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Lint code
        run: npm run lint
      - name: Build
        run: npm run build
```

---

## Contribuir

1. Haz un **Fork** del proyecto.
2. Crea una rama para tu característica (`git checkout -b feature/NuevaMejora`).
3. Realiza tus cambios y haz **Commit** (`git commit -m 'Añade nueva funcionalidad'`).
4. Sube los cambios a tu rama (`git push origin feature/NuevaMejora`).
5. Abre un **Pull Request**.

---

## Seguridad y buenas prácticas

- **Variables de entorno**: Nunca subas el archivo `.env` al repositorio (ya incluido en `.gitignore`).
- **Secretos**: Utiliza los secretos de GitHub para manejar API Keys en el CI/CD.
- **SSL**: Asegúrate de que el despliegue final use HTTPS.

---

## Licencia y contacto

- **Licencia**: MIT
- **Autor**: Frederick Iribarren
- **Email**: frederickiribarren@gmail.com

---

## Extras

### Estructura de carpetas

```text
/src
  /assets      # Imágenes y fuentes estáticas
  /components  # Componentes reutilizables (Header, Banner, etc.)
  /pages       # Vistas principales (Home, Productos, Contacto)
  /img         # Imágenes de productos
  App.jsx      # Router y estructura base
  main.jsx     # Punto de entrada de React
```

### Documentación adicional

- Revisa el [CHANGELOG.md](./CHANGELOG.md) para ver el historial de cambios.
- Documentación extendida en la carpeta `/docs`.

---

## Instrucciones para personalizar este README

- Reemplaza las URLs genéricas de los badges por las reales de tu repositorio.
- Si añades un backend real, actualiza la sección de **API y Endpoints**.
- Asegúrate de actualizar el archivo `.env.example` si agregas nuevas variables.
- Modifica los comandos de **Migraciones** si decides usar una DB específica.
