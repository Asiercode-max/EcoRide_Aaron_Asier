# Instalación

Esta página describe los requisitos técnicos del proyecto EcoRide y los pasos generales que seguiría un desarrollador para preparar el entorno. Como EcoRide es un proyecto ficticio, la aplicación todavía no se ha programado: las versiones y los comandos que aparecen aquí son ejemplos orientativos.

## Requisitos técnicos

| Componente | Tecnología | Versión orientativa | Función |
| --- | --- | --- | --- |
| Aplicación móvil | Flutter | 3.x | Interfaz que utiliza el cliente |
| Servidor | Java + Spring Boot | Java 21 / Spring Boot 3.x | Lógica de negocio y API REST |
| Base de datos | PostgreSQL | 16 | Almacenamiento de los datos |
| Comunicación | API REST con JSON | HTTPS | Intercambio de datos entre app y servidor |
| Documentación | Python + Material for MkDocs | Python 3.11+ / MkDocs Material 9.x | Esta web de documentación |

## Pasos para preparar el entorno

1. Comprobar que Python está instalado y que se puede ejecutar desde el terminal.
2. Crear un entorno virtual de Python dentro de la carpeta del proyecto y activarlo.
3. Instalar el paquete Material for MkDocs con el gestor de paquetes de Python.
4. Abrir la carpeta del proyecto con Visual Studio Code.
5. Arrancar el servidor local de MkDocs y abrir en el navegador la dirección que aparezca en el terminal (normalmente `http://127.0.0.1:8000`).
6. Para el proyecto completo, preparar además el entorno de Java, la base de datos PostgreSQL y el SDK de Flutter (pasos orientativos, no probados en esta práctica).

## Comandos de ejemplo

Los siguientes comandos son orientativos y hay que ejecutarlos desde la carpeta `ecoride-docs`:

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
mkdocs serve
```

!!! warning "Comandos orientativos"
    Estos comandos son ejemplos orientativos y no se han probado sobre el proyecto completo. En Windows con Git Bash la ruta de activación es `.venv/Scripts/activate`; en Linux o macOS es `.venv/bin/activate`.
