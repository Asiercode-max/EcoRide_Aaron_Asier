# Instal·lació

Aquesta pàgina descriu els requisits tècnics del projecte EcoRide i els passos generals que seguiria un desenvolupador per preparar l'entorn. Com que EcoRide és un projecte fictici, l'aplicació encara no s'ha programat: les versions i els comandaments que apareixen ací són exemples orientatius.

## Requisits tècnics

| Component | Tecnologia | Versió orientativa | Funció |
| --- | --- | --- | --- |
| Aplicació mòbil | Flutter | 3.x | Interfície que utilitza el client |
| Servidor | Java + Spring Boot | Java 21 / Spring Boot 3.x | Lògica de negoci i API REST |
| Base de dades | PostgreSQL | 16 | Emmagatzematge de les dades |
| Comunicació | API REST amb JSON | HTTPS | Intercanvi de dades entre app i servidor |
| Documentació | Python + Material for MkDocs | Python 3.11+ / MkDocs Material 9.x | Aquesta web de documentació |

## Passos per preparar l'entorn

1. Comprovar que Python està instal·lat i que es pot executar des del terminal.
2. Crear un entorn virtual de Python dins de la carpeta del projecte i activar-lo.
3. Instal·lar el paquet Material for MkDocs amb l'administrador de paquets de Python.
4. Obrir la carpeta del projecte amb Visual Studio Code.
5. Arrancar el servidor local de MkDocs i obrir al navegador l'adreça que aparega al terminal (normalment `http://127.0.0.1:8000`).
6. Per al projecte complet, preparar a més l'entorn de Java, la base de dades PostgreSQL i l'SDK de Flutter (passos orientatius, no provats en aquesta pràctica).

## Comandaments d'exemple

Els comandaments següents són orientatius i cal executar-los des de la carpeta `ecoride-docs`:

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
mkdocs serve
```

!!! warning "Comandaments orientatius"
    Aquests comandaments són exemples orientatius i no s'han provat sobre el projecte complet. En Windows amb Git Bash la ruta d'activació és `.venv/Scripts/activate`; en Linux o macOS és `.venv/bin/activate`.
