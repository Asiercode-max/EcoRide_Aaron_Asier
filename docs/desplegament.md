# Desplegament

La documentació es publica com a lloc estàtic, però l'aplicació EcoRide necessita backend i base de dades. Aquesta pàgina descriu els entorns previstos i com s'aixeca el conjunt amb Docker.

## Entorns

| Entorn | Adreça | Dades | Ús |
| --- | --- | --- | --- |
| Local | `http://localhost:8000` | Sintètiques | Desenvolupament diari |
| Preproducció | `https://staging.ecoride.test` | Còpia anonimitzada | Proves abans de publicar |
| Producció | `https://api.ecoride.test` | Reals | Usuaris finals |

## Variables d'entorn

| Variable | Exemple | Descripció |
| --- | --- | --- |
| `DB_URL` | `jdbc:postgresql://db:5432/ecoride` | Connexió a PostgreSQL |
| `DB_USER` | `ecoride_app` | Usuari de l'aplicació |
| `DB_PASSWORD` | *(secret)* | Contrasenya, mai al repositori |
| `JWT_SECRET` | *(secret)* | Clau de signatura dels tokens |
| `RESERVE_TTL_MINUTES` | `15` | Caducitat de les reserves |

## Aixecar l'entorn local

```yaml
# docker-compose.yml (fragment orientatiu)
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
# Aixecar els serveis
docker compose up -d --build

# Comprovar que l'API respon
curl -s http://localhost:8080/api/stations | head
```

!!! note "Comandaments orientatius"
    Aquests comandaments són exemples i no s'han executat sobre el projecte complet; el backend encara està en desenvolupament.

## Pipeline de publicació

1. **Proves** automàtiques del backend i de l'aplicació mòbil.
2. **Construcció** de la imatge Docker i de l'APK de proves.
3. **Publicació** a l'entorn de preproducció i smoke test de les rutes principals.
4. **Promoció** a producció amb desplegament progressiu.

!!! warning "Rollback"
    Cada publicació guarda la imatge anterior. Si el smoke test falla, es torna a la versió prèvia amb `docker compose up -d` apuntant a l'etiqueta anterior; la base de dades no es toca perquè les migracions són compatibles cap arrere.

El detall de les comprovacions prèvies és a [Proves](proves.md) i els rols que fan cada pas, a [Equip](equip.md).
