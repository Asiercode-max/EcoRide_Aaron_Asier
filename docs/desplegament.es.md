# Despliegue

La documentación se publica como sitio estático, pero la aplicación EcoRide necesita backend y base de datos. Esta página describe los entornos previstos y cómo se levanta el conjunto con Docker.

## Entornos

| Entorno | Dirección | Datos | Uso |
| --- | --- | --- | --- |
| Local | `http://localhost:8000` | Sintéticos | Desarrollo diario |
| Preproducción | `https://staging.ecoride.test` | Copia anonimizada | Pruebas antes de publicar |
| Producción | `https://api.ecoride.test` | Reales | Usuarios finales |

## Variables de entorno

| Variable | Ejemplo | Descripción |
| --- | --- | --- |
| `DB_URL` | `jdbc:postgresql://db:5432/ecoride` | Conexión a PostgreSQL |
| `DB_USER` | `ecoride_app` | Usuario de la aplicación |
| `DB_PASSWORD` | *(secreto)* | Contraseña, nunca en el repositorio |
| `JWT_SECRET` | *(secreto)* | Clave de firma de los tokens |
| `RESERVE_TTL_MINUTES` | `15` | Caducidad de las reservas |

## Levantar el entorno local

```yaml
# docker-compose.yml (fragmento orientativo)
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ecoride
      POSTGRES_USER: ecoride_app
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
  api:
    build: ./backend
    environment:
      DB_URL: jdbc:postgresql://db:5432/ecoride
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "8080:8080"
    depends_on:
      - db
```

```bash
# Levantar los servicios
docker compose up -d --build

# Comprobar que la API responde
curl -s http://localhost:8080/api/stations | head
```

!!! note "Comandos orientativos"
    Estos comandos son ejemplos y no se han ejecutado sobre el proyecto completo; el backend todavía está en desarrollo.

## Pipeline de publicación

1. **Pruebas** automáticas del backend y de la aplicación móvil.
2. **Construcción** de la imagen Docker y del APK de pruebas.
3. **Publicación** en el entorno de preproducción y smoke test de las rutas principales.
4. **Promoción** a producción con despliegue progresivo.

!!! warning "Rollback"
    Cada publicación guarda la imagen anterior. Si el smoke test falla, se vuelve a la versión previa con `docker compose up -d` apuntando a la etiqueta anterior; la base de datos no se toca porque las migraciones son compatibles hacia atrás.

El detalle de las comprobaciones previas está en [Pruebas](proves.es.md) y los roles que hacen cada paso, en [Equipo](equip.es.md).
