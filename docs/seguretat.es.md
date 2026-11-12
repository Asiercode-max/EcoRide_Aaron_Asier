# Seguridad y protección de datos

EcoRide trata datos personales (nombre, correo e historial de desplazamientos), así que la seguridad no es un añadido: condiciona el diseño de la API y de la base de datos. Esta página recoge las decisiones previstas.

## Autenticación

La aplicación móvil obtiene un **token JWT** al iniciar sesión. El token de acceso dura 15 minutos y el de refresco siete días; el servidor firma ambos con HS256 y guarda solo el *hash* del refresco, de modo que una copia de la base de datos no permite suplantar a ningún usuario.

```json
{
  "sub": "usr_1042",
  "rol": "USUARI",
  "iat": 1762598400,
  "exp": 1762599300,
  "iss": "ecoride-api"
}
```

## Roles y permisos

| Rol | Puede hacer | No puede hacer |
| --- | --- | --- |
| Visitante | Consultar estaciones y bicicletas | Reservar ni ver el historial |
| Usuario | Reservar, finalizar trayectos, ver su historial | Modificar bicicletas ni ver datos de otras personas |
| Administración | Gestionar estaciones, bicicletas y usuarios | Cambiar el historial de trayectos |

Cada petición pasa por el filtro de autenticación y, después, por una comprobación de rol. Un usuario solo puede leer el recurso `/api/users/{id}` si el `id` coincide con el de su token.

## Protección de datos

- **Minimización**: no se pide teléfono, dirección ni fecha de nacimiento; solo lo necesario para identificar la cuenta.
- **Contraseñas**: nunca en texto plano; se almacenan con bcrypt (coste 12).
- **Tráfico**: HTTPS obligatorio con TLS 1.3; el servidor rechaza conexiones HTTP en producción.
- **Retención**: los trayectos se conservan 12 meses y después se anonimizan para estadísticas.
- **Derechos**: desde *Mi cuenta* se puede descargar una copia de los datos y solicitar la supresión de la cuenta.

## Estado de las medidas

| Medida | Estado |
| --- | --- |
| Filtro JWT en todas las rutas privadas | <span class="badge badge--dev">En desarrollo</span> |
| Cifrado de contraseñas con bcrypt | <span class="badge badge--dev">En desarrollo</span> |
| Limitación de peticiones (rate limiting) | <span class="badge badge--prevista">Prevista</span> |
| Registro de auditoría de acciones de administración | <span class="badge badge--prevista">Prevista</span> |
| Exportación y supresión de datos | <span class="badge badge--prevista">Prevista</span> |

!!! warning "Entorno de desarrollo"
    Los secretos (clave JWT, contraseña de la base de datos) nunca se suben al repositorio: se leen de variables de entorno, como se explica en [Despliegue](desplegament.es.md).
