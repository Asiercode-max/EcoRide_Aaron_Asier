# Equip i repartiment de tasques

El projecte el desenvolupa una parella d'alumnes de 2n de DAM. Cada persona assumix un rol principal, però les decisions tècniques es prenen conjuntament i tot el codi passa per revisió de l'altra persona.

## Rols

| Rol | Responsabilitat | Lliura |
| --- | --- | --- |
| Backend i base de dades | API REST, model de dades, migracions, seguretat | Codi del servici, col·lecció de proves de l'API |
| Aplicació i documentació | Pantalles Flutter, integració amb l'API, lloc MkDocs | APK de proves, documentació publicada |

## Repartiment per fases

| Fase | Backend | Aplicació i documentació |
| --- | --- | --- |
| 1. Anàlisi | Model de dades i rutes de l'API | Estructura del lloc i wireframes |
| 2. Desenvolupament | Autenticació i estacions | Registre, mapa i navegació |
| 3. Integració | Reserves i historial | Reserva i pantalla de trajecte |
| 4. Tancament | Proves d'integració i desplegament | Captures, memòria i lliurament |

## Coordinació

- **Repositori**: dues branques de treball (`backend` i `app`) i *pull requests* cap a `main`.
- **Reunions**: una revisió curta al final de cada sessió de classe per a repartir la faena següent.
- **Documentació**: qualsevol canvi de l'API s'actualitza eixa mateixa setmana a [API](api.md) i a [Arquitectura](arquitectura.md).

!!! note "Noms al document de lliurament"
    En aquesta pàgina es descriuen els rols, no les persones. Els noms i el repartiment signat per la parella van al document breu de lliurament, junt amb les captures i la dificultat trobada.
