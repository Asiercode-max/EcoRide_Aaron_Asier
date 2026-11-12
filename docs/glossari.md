# Glossari

Termes tècnics que apareixen al llarg de la documentació, explicats en una línia.

API REST
:   Interfície HTTP per la qual l'aplicació mòbil demana dades al servidor.

Backend
:   Part del sistema que s'executa al servidor: conté la lògica de negoci i accedix a la base de dades.

DTO
:   *Data Transfer Object*: objecte sense lògica que s'envia o es rep a l'API.

Endpoint
:   Cada adreça de l'API que accepta peticions, per exemple `GET /api/stations`.

Estat
:   Situació d'una bicicleta (`disponible`, `reservada`, `en ús`, `avariada`) o d'una reserva (`confirmada`, `en curs`, `finalitzada`, `caducada`).

JWT
:   *JSON Web Token*: token signat que identifica l'usuari en cada petició.

Migració
:   Script versionat que canvia l'esquema de la base de dades sense perdre dades.

Reserva
:   Bloqueig temporal d'una bicicleta concreta per a un usuari, amb una caducitat de 15 minuts.

Testcontainers
:   Llibreria que aixeca un PostgreSQL real i temporal durant les proves d'integració.

!!! tip "Termes que falten?"
    Si trobes un concepte que no apareix ací, indica-ho a l'equip: el glossari s'actualitza al mateix temps que la resta de la documentació.
