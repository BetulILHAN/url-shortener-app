# 🔗 URL Shortener App

The Url shortener allows the user to get a short url from a long url. The user can then use this short url to access to the link associated to the original long url.
Detailed technical informations are given bellow.

# 🔗 URL Shortener Backend

## Description
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
DB_HOST= enter your db host
DB_PORT= enter your db port
DB_USER= enter your db user
DB_PASS= enter your db password
DB_NAME= enter your db name

PORT_BACKEND= enter your backend port
HOST= enter your backend host
LOG_LEVEL=info
AUTHORIZED_CORS_ORIGIN= enter your frontend host


---
```
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

# 🔗 URL Shortener Frontend

## Description

This project is a frontend built with **React**, **TypeScript**, and **Vite**. It provides a simple interface for a URL shortening service. Users can enter a long URL, validate it, and get a shortened version by calling a backend API.

---

## 🧱 Tech Stack

- React
- TypeScript
- Vite (build tool and development server)
- Axios (for HTTP requests)
- React Router (for routing)
- Jest (for testing)
- ESLint & Prettier (for code quality)

---

## Installation and Usages

1. Clone the repository
2. Install dependencies using npm :

```

# 1. Install dependencies
npm install

# 4. Run tests
npm test

# 5. Format code

npm run format
```
