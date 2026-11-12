# Glossary

Technical terms used throughout the documentation, explained in one line.

API REST
:   HTTP interface the mobile app uses to request data from the server.

Backend
:   The part of the system running on the server: it holds the business logic and talks to the database.

DTO
:   *Data Transfer Object*: a logic-free object sent to or received from the API.

Endpoint
:   Each API address that accepts requests, for example `GET /api/stations`.

Status
:   The state of a bike (`available`, `reserved`, `in use`, `broken`) or of a reservation (`confirmed`, `in progress`, `finished`, `expired`).

JWT
:   *JSON Web Token*: a signed token that identifies the user on every request.

Migration
:   A versioned script that changes the database schema without losing data.

Reservation
:   A temporary lock on a specific bike for a user, expiring after 15 minutes.

Testcontainers
:   A library that starts a real, temporary PostgreSQL during integration tests.

!!! tip "Missing a term?"
    If you find a concept that is not here, tell the team: the glossary is updated along with the rest of the documentation.
