# 🔗 Express TypeScript URL Shortener Service

A production-ready, high-performance **URL Shortener microservice** built with Express.js, TypeScript, MongoDB (Mongoose), Redis, and Docker. 

Designed with a clean multi-layer architecture (DTOs, Repositories, Services, Controllers) featuring atomic counter-based short URL generation, fast Redis caching layer, and full Docker containerization with live hot reloading.

---

## 🚀 Key Features

- ⚡ **TypeScript & Node.js**: Strict type checking with modern ESNext features.
- 🚀 **High Performance Caching**: Redis integration for $O(1)$ fast URL redirection and atomic counter generation.
- 🍃 **Persistent Database**: MongoDB with Mongoose schemas, indexed `shortUrl`, and automated timestamps.
- 🐳 **Docker & Docker Compose**: Multi-container setup containing Express, MongoDB, and Redis with live hot reloading.
- 🏗️ **Clean Architecture**: Layered separation using DTOs, Repositories, Controllers, and Middlewares.
- 🛡️ **Security**: Pre-configured with `helmet` and `cors` security headers.
- 📝 **Structured API**: Standardized JSON responses (`ApiResponse`, `ApiError`, `asyncHandler`).
- 🧹 **Code Quality**: Linting and formatting with ESLint, Prettier, and Husky pre-commit hooks.
- 🔌 **Graceful Shutdown**: Handles `SIGTERM` and `SIGINT` signals to close MongoDB & Redis connections cleanly.

---

## 📂 Project Structure

```text
├── src/
│   ├── config/          # Environment variables, MongoDB & Redis connections
│   ├── controllers/     # Handlers for HTTP requests/responses
│   ├── dtos/            # Data Transfer Objects & Interfaces
│   ├── middlewares/     # Error handling, 404 handler, request loggers
│   ├── models/          # Mongoose database schemas & models
│   ├── repositories/    # Database & Redis caching repository layer
│   ├── routes/          # Express route definitions (v1, v2)
│   ├── utils/           # Utilities (ApiError, ApiResponse, asyncHandler)
│   ├── app.ts           # Express app initialization & middleware stack
│   └── server.ts        # Entrypoint, server boot & graceful shutdown
├── Dockerfile           # Multi-stage Docker build config
├── docker-compose.yml   # Orchestration for Express, MongoDB & Redis
├── .env.example         # Template environment variables
├── tsconfig.json        # TypeScript configuration
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Language** | TypeScript / Node.js 20 | Static typing and runtime engine |
| **Framework** | Express.js 5 | Lightweight HTTP API framework |
| **Database** | MongoDB + Mongoose 9 | Primary database for URL records & analytics |
| **Cache Store** | Redis 7 | High-speed cache for short URL lookups & ID counters |
| **Containerization** | Docker & Docker Compose | Multi-container environment orchestration |

---

## ⚙️ Quick Start with Docker (Recommended)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 1. Clone & Setup Environment

```bash
cp .env.example .env
```

### 2. Start Full Stack (App + MongoDB + Redis)

```bash
npm run docker:up
```

This starts:
- **Express API**: `http://localhost:3000` (with live hot reloading)
- **MongoDB**: `localhost:27017`
- **Redis**: `localhost:6379`

---

## 📦 Local Development (Without Docker)

### Prerequisites

- Node.js (v18+ or v20+)
- MongoDB and Redis servers running locally.

### Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build TypeScript for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📜 Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `node --import tsx --watch src/server.ts` | Starts development server with native hot reload |
| `npm run build` | `tsc` | Compiles TypeScript source to `dist/` |
| `npm start` | `node dist/server.js` | Runs production JavaScript build |
| `npm run docker:up` | `docker compose up -d --build` | Starts all services in background via Docker |
| `npm run docker:down` | `docker compose down` | Stops Docker containers |
| `npm run docker:clean` | `docker compose down -v` | Stops containers and resets database volumes |
| `npm run docker:reset` | `docker compose down -v && docker compose up -d --build` | Full fresh container reset |
| `npm run docker:logs` | `docker compose logs -f` | Tails live Docker logs |
| `npm run lint` | `eslint .` | Runs ESLint analysis |
| `npm run format` | `prettier --write "src/**/*.ts"` | Formats code with Prettier |

---

## 🌐 Sample Endpoints

- `GET /` - Base server greeting and status
- `GET /api/v1/health` - System health check & uptime monitor
- `GET /api/v1/sample` - Sample response endpoint
