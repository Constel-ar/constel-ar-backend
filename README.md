## Architecture

We'll use a simple architecture approach to divide the project into different layers:

```
/src
  /routes          # Puntos de entrada para las rutas de Express
  /controllers     # Controladores que manejan la lógica de request/response
  /campaigns       # Toda la funcionalidad relacionada con campañas
    /temporary
      temporary.controller.ts
      temporary.service.ts
      temporary.routes.ts
    /confirmed
      confirmed.controller.ts
      confirmed.service.ts
      confirmed.routes.ts
    campaigns.types.ts  # Tipos/Interfaces compartidas en TypeScript
  /supabase       # Integración con la base de datos Supabase y consultas
    client.ts     # Configuración del cliente de Supabase
    queries.ts    # Funciones/consultas genéricas
    migrations/   # Opcional: archivos SQL para creación de tablas
index.ts
.env.example


## Contribution Methodology

- `main` branch will be the production environment.
- Feature branches: `feat/(task)`.
- Once the feature branch is validated and tested, a PR will be created against `main` and will be validated by at least one other team member.

---

## Technologies

- **Backend Framework:** Express + TypeScript  
- **Database & Auth:** Supabase  
- **Hosting Backend:** Railway





create table 


