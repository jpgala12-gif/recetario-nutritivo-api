# recetario-nutritivo-api

API REST para gestionar un recetario. Permite registrar usuarios, iniciar sesión y administrar recetas (crear, listar, consultar, modificar y eliminar). Las operaciones que modifican datos están protegidas con JWT.

Trabajo práctico integrador del Bootcamp 5.0 (módulo Node.js).

## Tecnologías

- Node.js + TypeScript
- Express 5
- MongoDB Atlas + Mongoose
- Bcrypt (hash de contraseñas)
- JSON Web Token (autenticación)
- dotenv (variables de entorno)

## Requisitos previos

- Node.js 20.19 o superior
- Una cuenta de [MongoDB Atlas](https://www.mongodb.com/atlas) con un cluster creado, un usuario de base de datos y tu IP habilitada en **Network Access**

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/jpgala12-gif/recetario-nutritivo-api.git
cd recetario-nutritivo-api
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

En Windows (PowerShell): `copy .env.example .env`

4. Completar el `.env` con tus valores (ver la sección siguiente).

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto en el que escucha el servidor (por ejemplo, `3000`) |
| `MONGO_URI` | Cadena de conexión de MongoDB Atlas, incluyendo el nombre de la base |
| `JWT_SECRET` | Frase secreta usada para firmar los tokens. Tiene que ser larga y difícil de adivinar |

Ejemplo de `MONGO_URI`:

```
mongodb+srv://USUARIO:PASSWORD@cluster0.xxxxx.mongodb.net/recetario-db?retryWrites=true&w=majority
```

El archivo `.env` está en el `.gitignore` y no se sube al repositorio. El repositorio incluye `.env.example` con los nombres de las variables, sin valores.

## Ejecución

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Inicia el servidor en modo desarrollo (se reinicia solo al guardar cambios) |
| `npm run build` | Compila TypeScript a la carpeta `dist/` |
| `npm start` | Ejecuta la versión compilada (`dist/app.js`) |

Con el servidor en marcha, la API queda disponible en `http://localhost:3000`.

## Estructura del proyecto

Arquitectura en capas (ruta, controlador, servicio y acceso a datos), organizada por componentes de negocio.

```
src/
├── app.ts                          # Configuración de Express y arranque del servidor
├── db/
│   └── connection.ts               # Conexión a MongoDB con Mongoose
└── api/
    ├── components/
    │   ├── recipe/
    │   │   ├── routes.ts           # Rutas y middlewares
    │   │   ├── controller.ts       # Manejo de req/res y códigos de estado
    │   │   ├── service.ts          # Validaciones de negocio
    │   │   ├── dao.ts              # Acceso a datos
    │   │   └── model.ts            # Esquema de Receta
    │   └── user/
    │       ├── routes.ts
    │       ├── controller.ts
    │       ├── service.ts          # Registro (Bcrypt) y login (JWT)
    │       ├── dao.ts
    │       └── model.ts            # Esquema de Usuario
    ├── middlewares/
    │   └── auth.middleware.ts      # Verificación del token JWT
    └── utils/
        ├── AppError.ts             # Error con código de estado
        └── handleError.ts          # Respuesta de errores centralizada
```

## Modelos

### Receta

| Campo | Tipo | Detalle |
| --- | --- | --- |
| `nombre` | String | Obligatorio |
| `ingredientes` | Array de String | Obligatorio, al menos un ingrediente |
| `tiempoPreparacion` | Number | Obligatorio, mayor a 0 (en minutos) |
| `dificultad` | String | Obligatorio: `Fácil`, `Media` o `Difícil` |

### Usuario

| Campo | Tipo | Detalle |
| --- | --- | --- |
| `email` | String | Obligatorio, único, formato válido |
| `password` | String | Obligatorio, mínimo 6 caracteres. Se guarda hasheada con Bcrypt |
| `role` | String | `user` o `admin`. Se asigna `user` al registrarse |

## Autenticación

1. El usuario se registra en `POST /api/users/register`.
2. Inicia sesión en `POST /api/users/login` y recibe un token JWT (válido por 1 hora).
3. En las rutas protegidas envía el token en el header:

```
Authorization: Bearer <token>
```

El token contiene únicamente el `id` y el `role` del usuario, nunca datos sensibles. Si falta o no es válido, la API responde `401`.

## Endpoints

### Usuarios

| Método | Ruta | Protegida | Descripción |
| --- | --- | --- | --- |
| POST | `/api/users/register` | No | Registra un usuario |
| POST | `/api/users/login` | No | Inicia sesión y devuelve un token |

**POST `/api/users/register`**

Body:

```json
{
  "email": "ana@mail.com",
  "password": "clave123"
}
```

Respuesta `201`:

```json
{
  "id": "6afcf7780026c9f7a89c7455",
  "email": "ana@mail.com",
  "role": "user"
}
```

**POST `/api/users/login`**

Body:

```json
{
  "email": "ana@mail.com",
  "password": "clave123"
}
```

Respuesta `200`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Recetas

| Método | Ruta | Protegida | Descripción |
| --- | --- | --- | --- |
| GET | `/api/recipes` | No | Lista todas las recetas |
| GET | `/api/recipes/:id` | No | Obtiene una receta por id |
| POST | `/api/recipes` | Sí | Crea una receta |
| PUT | `/api/recipes/:id` | Sí | Modifica una receta |
| DELETE | `/api/recipes/:id` | Sí | Elimina una receta |

**POST `/api/recipes`** (requiere token)

Body:

```json
{
  "nombre": "Tortilla de papa",
  "ingredientes": ["huevo", "papa", "cebolla"],
  "tiempoPreparacion": 30,
  "dificultad": "Fácil"
}
```

Respuesta `201`:

```json
{
  "nombre": "Tortilla de papa",
  "ingredientes": ["huevo", "papa", "cebolla"],
  "tiempoPreparacion": 30,
  "dificultad": "Fácil",
  "_id": "6afcf9700026c9f7a89c7456",
  "createdAt": "2026-11-18T01:03:44.290Z",
  "updatedAt": "2026-11-18T01:03:44.290Z"
}
```

**PUT `/api/recipes/:id`** (requiere token)

Body (se envían solo los campos a modificar):

```json
{
  "tiempoPreparacion": 45
}
```

**DELETE `/api/recipes/:id`** (requiere token)

Respuesta `200`:

```json
{
  "message": "Receta eliminada correctamente"
}
```

## Validaciones de negocio

Se aplican en la capa de servicio:

- El `id` debe tener un formato válido de MongoDB.
- `tiempoPreparacion` debe ser mayor a 0.
- `ingredientes` debe tener al menos un elemento.
- El cuerpo de la solicitud no puede estar vacío.
- El email debe tener un formato válido y no puede estar repetido.
- La contraseña debe tener al menos 6 caracteres.

## Códigos de estado

| Código | Cuándo se devuelve |
| --- | --- |
| 200 | Operación exitosa (consultas, modificación, eliminación, login) |
| 201 | Recurso creado (receta, usuario) |
| 400 | Datos inválidos, id con formato incorrecto, JSON mal formado o email repetido |
| 401 | Token ausente, inválido o vencido, o credenciales incorrectas |
| 404 | La receta no existe |
| 500 | Error interno del servidor |

Los errores se devuelven con este formato:

```json
{
  "message": "Descripción del error"
}
```
## Extras implementados

- **Middleware de logging:** cada petición muestra en la consola el método HTTP y la URL (por ejemplo, `GET /api/recipes`). Está en `src/api/middlewares/logger.middleware.ts`.

## Pruebas

Las pruebas se hicieron con Thunder Client. La colección exportada está en la carpeta `thunder-client/` del repositorio e incluye los casos exitosos y los de error (400, 401 y 404).

## Autor

Juan Pablo Galarza - [@jpgala12-gif](https://github.com/jpgala12-gif)