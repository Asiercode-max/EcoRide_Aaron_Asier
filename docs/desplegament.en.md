# Deployment

The documentation is published as a static site, but the EcoRide application needs a backend and a database. This page describes the planned environments and how to bring the stack up with Docker.

## Environments

| Environment | Address | Data | Use |
| --- | --- | --- | --- |
| Local | `http://localhost:8000` | Synthetic | Daily development |
| Staging | `https://staging.ecoride.test` | Anonymised copy | Pre-release testing |
| Production | `https://api.ecoride.test` | Real | End users |

## Environment variables

| Variable | Example | Description |
| --- | --- | --- |
| `DB_URL` | `jdbc:postgresql://db:5432/ecoride` | PostgreSQL connection |
| `DB_USER` | `ecoride_app` | Application user |
| `DB_PASSWORD` | *(secret)* | Password, never in the repository |
| `JWT_SECRET` | *(secret)* | Token signing key |
| `RESERVE_TTL_MINUTES` | `15` | Reservation expiry |

## Bringing up the local environment

```yaml
# docker-compose.yml (illustrative fragment)
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
# Start the services
docker compose up -d --build

# Check that the API responds
curl -s http://localhost:8080/api/stations | head
```

!!! note "Illustrative commands"
    These commands are examples and have not been run against the full project; the backend is still in development.

## Release pipeline

1. **Tests** for the backend and the mobile app run automatically.
2. **Build** of the Docker image and the test APK.
3. **Publish** to staging and smoke test the main routes.
4. **Promote** to production with a gradual rollout.

!!! warning "Rollback"
    Every release keeps the previous image. If the smoke test fails, the earlier tag is brought back with `docker compose up -d`; the database is untouched because migrations are backwards compatible.

Testing details are in [Tests](proves.en.md) and the roles behind each step are in [Team](equip.en.md).
