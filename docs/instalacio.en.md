# Installation

This page describes the technical requirements of the EcoRide project and the general steps a developer would follow to prepare the environment. Because EcoRide is a fictional project, the application has not been programmed yet: the versions and commands shown here are illustrative examples.

## Technical requirements

| Component | Technology | Approximate version | Purpose |
| --- | --- | --- | --- |
| Mobile app | Flutter | 3.x | Interface used by the customer |
| Server | Java + Spring Boot | Java 21 / Spring Boot 3.x | Business logic and REST API |
| Database | PostgreSQL | 16 | Data storage |
| Communication | REST API with JSON | HTTPS | Data exchange between app and server |
| Documentation | Python + Material for MkDocs | Python 3.11+ / MkDocs Material 9.x | This documentation site |

## Steps to prepare the environment

1. Check that Python is installed and can be run from the terminal.
2. Create a Python virtual environment inside the project folder and activate it.
3. Install the Material for MkDocs package with the Python package manager.
4. Open the project folder in Visual Studio Code.
5. Start the local MkDocs server and open the address printed in the terminal (usually `http://127.0.0.1:8000`).
6. For the full project, also prepare the Java environment, the PostgreSQL database and the Flutter SDK (illustrative steps, not tested in this assignment).

## Example commands

The following commands are illustrative and must be run from the `ecoride-docs` folder:

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
mkdocs serve
```

!!! warning "Illustrative commands"
    These commands are illustrative examples and have not been tested on the full project. On Windows with Git Bash the activation path is `.venv/Scripts/activate`; on Linux or macOS it is `.venv/bin/activate`.
