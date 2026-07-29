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
- Evitar utilizar mesas fuera de servicio.
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