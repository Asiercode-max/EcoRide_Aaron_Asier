# Tests

Tests define when a feature can be considered done. EcoRide follows a simple pyramid: many unit tests, some integration tests and few end-to-end tests.

## Strategy

| Level | Tool | What it covers | Target |
| --- | --- | --- | --- |
| Unit | JUnit 5 / Vitest | Services, cost and CO₂ calculations | 80 % coverage |
| Integration | Spring Boot Test + Testcontainers | Repositories and controllers against a real PostgreSQL | Every API route |
| End-to-end | Flutter integration_test | Sign-up, reservation and finish | Full main flow |

## Main cases

| ID | Case | Expected result | Type |
| --- | --- | --- | --- |
| R-01 | Reserve a free bike | `201 Created` with `estat: "confirmada"` | Integration |
| R-02 | Reserve a bike that is already reserved | `409 Conflict` and no database change | Integration |
| R-03 | Reservation without a token | `401 Unauthorized` | Integration |
| C-01 | Cost of a 25-minute trip | 10 billable minutes | Unit |
| C-02 | CO₂ for a 3.4 km trip | 408 g of CO₂ saved | Unit |
| U-01 | Read another user's profile | `403 Forbidden` | Integration |

## Running the tests

```bash
# Backend
./mvnw test

# Mobile app
flutter test

# End-to-end tests (require an emulator)
flutter test integration_test
```

!!! note "Illustrative commands"
    The commands match the project's planned structure; they have not been run yet because the backend and the app are not implemented.

!!! tip "Definition of done"
    A feature is *done* when its cases pass locally, in the pipeline and in staging, and the [API](api.en.md) documentation reflects the real behaviour.
