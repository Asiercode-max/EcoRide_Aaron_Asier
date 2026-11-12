# Seguretat i protecció de dades

EcoRide tracta dades personals (nom, correu i historial de desplaçaments), així que la seguretat no és un afegit: condiciona el disseny de l'API i de la base de dades. Aquesta pàgina recull les decisions previstes.

## Autenticació

L'aplicació mòbil obté un **token JWT** en iniciar sessió. El token d'accés dura 15 minuts i el de refresc set dies; el servidor firma tots dos amb HS256 i guarda només el *hash* del refresc, de manera que una còpia de la base de dades no permet suplantar cap usuari.

```json
{
  "sub": "usr_1042",
  "rol": "USUARI",
  "iat": 1762598400,
  "exp": 1762599300,
  "iss": "ecoride-api"
}
```

## Rols i permisos

| Rol | Pot fer | No pot fer |
| --- | --- | --- |
| Visitant | Consultar estacions i bicicletes | Reservar ni veure l'historial |
| Usuari | Reservar, finalitzar trajectes, veure el seu historial | Modificar bicicletes ni veure dades d'altres persones |
| Administració | Gestionar estacions, bicicletes i usuaris | Canviar el historial de trajectes |

Cada petició passa pel filtre d'autenticació i, després, per una comprovació de rol. Un usuari només pot llegir el recurs `/api/users/{id}` si l'`id` coincidix amb el seu token.

## Protecció de dades

- **Minimització**: no es demana telèfon, adreça ni data de naixement; només el necessari per a identificar el compte.
- **Contrasenyes**: mai en text pla; s'emmagatzemen amb bcrypt (cost 12).
- **Trànsit**: HTTPS obligatori amb TLS 1.3; el servidor refusa connexions HTTP en producció.
- **Retenció**: els trajectes es conserven 12 mesos i després s'anonimitzen per a estadístiques.
- **Drets**: des de *El meu compte* es pot descarregar una còpia de les dades i sol·licitar la supressió del compte.

## Estat de les mesures

| Mesura | Estat |
| --- | --- |
| Filtre JWT a totes les rutes privades | <span class="badge badge--dev">En desenvolupament</span> |
| Xifrat de contrasenyes amb bcrypt | <span class="badge badge--dev">En desenvolupament</span> |
| Limitació de peticions (rate limiting) | <span class="badge badge--prevista">Prevista</span> |
| Registre d'auditoria d'accions d'administració | <span class="badge badge--prevista">Prevista</span> |
| Exportació i supressió de dades | <span class="badge badge--prevista">Prevista</span> |

!!! warning "Entorn de desenvolupament"
    Els secrets (clau JWT, contrasenya de la base de dades) mai no es pugen al repositori: es lliguen de variables d'entorn, com s'explica a [Desplegament](desplegament.md).
