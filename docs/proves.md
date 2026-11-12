# Proves

Les proves defineixen quan una funcionalitat es pot considerar acabada. EcoRide seguix una piràmide senzilla: moltes proves unitàries, algunes d'integració i poques proves de punta a punta.

## Estratègia

| Nivell | Eina | Què cobrix | Objectiu |
| --- | --- | --- | --- |
| Unitari | JUnit 5 / Vitest | Serveis, càlculs de cost i CO₂ | 80 % de cobertura |
| Integració | Spring Boot Test + Testcontainers | Repositoris i controladors contra PostgreSQL real | Totes les rutes de l'API |
| Punta a punta | Flutter integration_test | Registre, reserva i finalització | Flux principal complet |

## Casos principals

| ID | Cas | Resultat esperat | Tipus |
| --- | --- | --- | --- |
| R-01 | Reservar una bicicleta lliure | `201 Created` amb `estat: "confirmada"` | Integració |
| R-02 | Reservar una bicicleta ja reservada | `409 Conflict` i cap canvi a la base de dades | Integració |
| R-03 | Reserva sense token | `401 Unauthorized` | Integració |
| C-01 | Cost d'un trajecte de 25 minuts | 10 minuts facturables | Unitari |
| C-02 | CO₂ d'un trajecte de 3,4 km | 408 g de CO₂ estalviat | Unitari |
| U-01 | Consultar el perfil d'un altre usuari | `403 Forbidden` | Integració |

## Executar les proves

```bash
# Backend
./mvnw test

# Aplicació mòbil
flutter test

# Proves de punta a punta (requerixen un emulador)
flutter test integration_test
```

!!! note "Comandaments orientatius"
    Els comandaments corresponen a l'estructura prevista del projecte; encara no s'han executat perquè el backend i l'aplicació no estan implementats.

!!! tip "Definició de fet"
    Una funcionalitat es considera *feta* quan els seus casos passen en local, en el pipeline i a preproducció, i la documentació de l'[API](api.md) reflectix el comportament real.
