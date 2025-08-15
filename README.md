## Architecture

We'll use a simple architecture approach to divide the project into different layers:

```
/src
  /routes
  /controllers
  /supabase
index.ts
.env.example
```
---

## Contribution Methodology

- `main` branch will be the production environment.
- Feature branches: `feat/(task)`.
- Once the feature branch is validated and tested, a PR will be created against `main` and will be validated by at least one other team member.

---

## Technologies

- **Backend Framework:** Express + TypeScript  
- **Database & Auth:** Supabase  
- **Hosting Backend:** Railway
