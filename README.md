# RestoReserva

RestoReserva es una aplicación web para la gestión de reservas de un restaurante.

El sistema permite administrar clientes, mesas y reservas, controlar la disponibilidad de las mesas y consultar información general desde un dashboard.

## Funcionalidades

### Gestión de clientes

- Registrar clientes.
- Consultar clientes registrados.
- Editar información.
- Eliminar clientes.
- Buscar por nombre, apellido, teléfono o correo electrónico.
- Validar teléfonos y correos duplicados.

### Gestión de mesas

- Registrar mesas.
- Editar información.
- Eliminar mesas.
- Gestionar capacidad, ubicación y estado.
- Filtrar por estado, ubicación y capacidad mínima.
- Impedir reservas en mesas no disponibles.
- Evitar colocar fuera de servicio mesas con reservas futuras activas.

### Gestión de reservas

- Crear reservas.
- Consultar reservas.
- Editar reservas.
- Eliminar reservas.
- Asociar clientes y mesas.
- Registrar fecha, hora y cantidad de personas.
- Gestionar estados de reserva.
- Registrar solicitudes especiales.
- Buscar reservas por cliente.
- Filtrar por fecha y estado.

### Validaciones

El sistema incluye validaciones para:

- Evitar reservas en fechas pasadas.
- Evitar cantidades de personas mayores a la capacidad de la mesa.
- Evitar conflictos de reservas para una misma mesa, fecha y hora.
- Evitar crear reservas utilizando mesas que no estén disponibles.
- Evitar colocar una mesa fuera de servicio cuando tenga reservas futuras activas.
- Evitar números de mesa duplicados.
- Evitar datos duplicados de clientes.

### Dashboard

El panel principal muestra información dinámica como:

- Total de clientes.
- Total de mesas.
- Mesas disponibles.
- Reservas del día.
- Reservas pendientes.
- Reservas confirmadas.
- Próximas reservas.

## Tecnologías utilizadas

- Node.js
- Express.js
- EJS
- SQLite
- Bootstrap
- Bootstrap Icons
- JavaScript
- Git
- GitHub
- Git Flow

## Arquitectura

El proyecto utiliza una estructura organizada por responsabilidades:

```text
src/
├── config/
├── controllers/
├── models/
├── routes/
├── views/
└── app.js
```

- `config`: contiene la configuración e inicialización de la base de datos.
- `controllers`: contiene la lógica para procesar las solicitudes del sistema.
- `models`: gestiona las consultas y operaciones sobre SQLite.
- `routes`: define las rutas disponibles en la aplicación.
- `views`: contiene las interfaces desarrolladas con EJS.
- `public`: contiene los recursos estáticos utilizados por la aplicación.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Elias-cloud-max/RestoReserva.git
```

Entrar en la carpeta del proyecto:

```bash
cd RestoReserva
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

## Base de datos

RestoReserva utiliza SQLite para almacenar la información del sistema.

Las tablas necesarias son inicializadas por la aplicación al ejecutarse, permitiendo gestionar la información de clientes, mesas y reservas.

## Flujo de trabajo con Git

El proyecto fue desarrollado utilizando Git y Git Flow para organizar el proceso de desarrollo y mantener separadas las diferentes etapas del sistema.

Las ramas principales utilizadas son:

```text
main
develop
qa
```

Durante el desarrollo se utilizaron ramas de funcionalidades como:

```text
feature/base-layout
feature/client-management
feature/table-management
feature/reservation-management
feature/dashboard
feature/search-and-filters
```

También se utilizó una rama `hotfix/` para corregir problemas relacionados con la disponibilidad de las mesas y una rama `release/` para preparar la versión final del sistema.

Los cambios fueron integrados mediante Pull Requests para mantener un historial organizado del desarrollo.

## Versión

Versión actual:

```text
1.0.0
```

## Proyecto académico

RestoReserva fue desarrollado como proyecto académico de Programación III, aplicando conceptos de desarrollo web y control de versiones.

Durante el desarrollo se trabajó con:

- Git y GitHub.
- Git Flow.
- Ramas de desarrollo.
- Commits organizados.
- Pull Requests.
- Desarrollo de operaciones CRUD.
- Arquitectura MVC.
- Base de datos SQLite.
- Validación de datos y reglas de negocio.