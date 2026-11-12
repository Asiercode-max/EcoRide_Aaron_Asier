# Security and data protection

EcoRide handles personal data (name, email and trip history), so security is not an afterthought: it shapes the design of the API and the database. This page collects the planned decisions.

## Authentication

The mobile app obtains a **JWT token** on login. The access token lasts 15 minutes and the refresh token seven days; the server signs both with HS256 and stores only the refresh token *hash*, so a database copy cannot be used to impersonate any user.

```json
{
  "sub": "usr_1042",
  "rol": "USUARI",
  "iat": 1762598400,
  "exp": 1762599300,
  "iss": "ecoride-api"
}
```

## Roles and permissions

| Role | Can do | Cannot do |
| --- | --- | --- |
| Visitor | View stations and bikes | Reserve or see history |
| User | Reserve, finish trips, view own history | Modify bikes or see other people's data |
| Administration | Manage stations, bikes and users | Change trip history |

Every request goes through the authentication filter and then a role check. A user can only read `/api/users/{id}` when the `id` matches the one in their token.

## Data protection

- **Minimisation**: no phone number, address or date of birth is requested; only what is needed to identify the account.
- **Passwords**: never in plain text; stored with bcrypt (cost 12).
- **Traffic**: HTTPS enforced with TLS 1.3; the server rejects HTTP connections in production.
- **Retention**: trips are kept for 12 months and then anonymised for statistics.
- **Rights**: from *My account* users can download a copy of their data and request account deletion.

## Status of the measures

| Measure | Status |
| --- | --- |
| JWT filter on every private route | <span class="badge badge--dev">In development</span> |
| Password hashing with bcrypt | <span class="badge badge--dev">In development</span> |
| Rate limiting | <span class="badge badge--prevista">Planned</span> |
| Audit log for administration actions | <span class="badge badge--prevista">Planned</span> |
| Data export and deletion | <span class="badge badge--prevista">Planned</span> |

!!! warning "Development environment"
    Secrets (JWT key, database password) never go into the repository: they are read from environment variables, as explained in [Deployment](desplegament.en.md).
