# Pruebas

Las pruebas definen cuándo una funcionalidad se puede considerar acabada. EcoRide sigue una pirámide sencilla: muchas pruebas unitarias, algunas de integración y pocas pruebas de extremo a extremo.

## Estrategia

| Nivel | Herramienta | Qué cubre | Objetivo |
| --- | --- | --- | --- |
| Unitario | JUnit 5 / Vitest | Servicios, cálculos de coste y CO₂ | 80 % de cobertura |
| Integración | Spring Boot Test + Testcontainers | Repositorios y controladores contra PostgreSQL real | Todas las rutas de la API |
| Extremo a extremo | Flutter integration_test | Registro, reserva y finalización | Flujo principal completo |

## Casos principales

| ID | Caso | Resultado esperado | Tipo |
| --- | --- | --- | --- |
| R-01 | Reservar una bicicleta libre | `201 Created` con `estat: "confirmada"` | Integración |
| R-02 | Reservar una bicicleta ya reservada | `409 Conflict` y ningún cambio en la base de datos | Integración |
| R-03 | Reserva sin token | `401 Unauthorized` | Integración |
| C-01 | Coste de un trayecto de 25 minutos | 10 minutos facturables | Unitario |
| C-02 | CO₂ de un trayecto de 3,4 km | 408 g de CO₂ ahorrado | Unitario |
| U-01 | Consultar el perfil de otro usuario | `403 Forbidden` | Integración |

## Ejecutar las pruebas

```bash
# Backend
./mvnw test

# Aplicación móvil
flutter test

# Pruebas de extremo a extremo (requieren un emulador)
flutter test integration_test
```

!!! note "Comandos orientativos"
    Los comandos corresponden a la estructura prevista del proyecto; todavía no se han ejecutado porque el backend y la aplicación no están implementados.

!!! tip "Definición de hecho"
    Una funcionalidad se considera *hecha* cuando sus casos pasan en local, en el pipeline y en preproducción, y la documentación de la [API](api.es.md) refleja el comportamiento real.
