# Glosario

Términos técnicos que aparecen a lo largo de la documentación, explicados en una línea.

API REST
:   Interfaz HTTP por la que la aplicación móvil pide datos al servidor.

Backend
:   Parte del sistema que se ejecuta en el servidor: contiene la lógica de negocio y accede a la base de datos.

DTO
:   *Data Transfer Object*: objeto sin lógica que se envía o se recibe en la API.

Endpoint
:   Cada dirección de la API que acepta peticiones, por ejemplo `GET /api/stations`.

Estado
:   Situación de una bicicleta (`disponible`, `reservada`, `en uso`, `averiada`) o de una reserva (`confirmada`, `en curso`, `finalizada`, `caducada`).

JWT
:   *JSON Web Token*: token firmado que identifica al usuario en cada petición.

Migración
:   Script versionado que cambia el esquema de la base de datos sin perder datos.

Reserva
:   Bloqueo temporal de una bicicleta concreta para un usuario, con una caducidad de 15 minutos.

Testcontainers
:   Librería que levanta un PostgreSQL real y temporal durante las pruebas de integración.

!!! tip "¿Faltan términos?"
    Si encuentras un concepto que no aparece aquí, indícalo al equipo: el glosario se actualiza al mismo tiempo que el resto de la documentación.
