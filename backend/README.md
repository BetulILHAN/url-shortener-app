# 🔗 URL Shortener Backend

A minimal and efficient URL shortening service built with **Node.js**, **Express**, and **TypeScript**.  
It supports URL normalization, deduplication, slug generation, click tracking, and PostgreSQL persistence.

---

## 🚀 Features

- Generate short URLs from original ones
- Prevent duplicate slugs for the same URL
- Auto-normalize input URLs
- Redirect via slug and track clicks
- PostgreSQL persistence with Flyway migrations
- Clean code architecture with validation and logging

---

## 🧱 Tech Stack

- Node.js + Express (REST API)
- TypeScript
- PostgreSQL + Knex
- Flyway (DB migrations via Docker)
- Jest + Supertest (Testing)
- Winston (Logging)
- Zod (Validation)
- NanoID (Slug generation)

---

## ⚙️ Environment Variables

Create a `.env` file at the root of the project with the following:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=root
DB_NAME=url_shortener

PORT_BACKEND=3000
HOST=http://localhost:3000
LOG_LEVEL=info
AUTHORIZED_CORS_ORIGIN=http://localhost:5173


---


## Installation and Usages
```

# 1. Install dependencies

npm install

# 2. Run migrations (requires Docker)

npm run migrate

# 3. Start the dev server

npm run dev

# 4. Run tests

npm test

# 5. Format code

npm run format

```

```
