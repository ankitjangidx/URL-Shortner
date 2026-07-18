# Express TypeScript Starter Template

A clean, modern, production-ready Express.js boilerplate configured with TypeScript, ESLint, Prettier, and essential security middlewares.

## Features

- ⚡ **TypeScript**: Strict type checking with modern ESNext features.
- 🚀 **Hot Reloading**: Fast development workflow using `tsx`.
- 🛡️ **Security**: Pre-configured with `helmet` and `cors`.
- 📝 **Logging**: HTTP request logging using `morgan`.
- 🌐 **Structured API Response**: Standardized `ApiResponse` and `ApiError` utilities.
- 🔄 **Async Error Handling**: Clean async routes with `asyncHandler` wrapper.
- ⚙️ **Environment Management**: Centralized environment variable loading with `dotenv`.
- 🧹 **Code Quality**: Pre-configured `ESLint` and `Prettier`.
- 🔌 **Graceful Shutdown**: Handles `SIGTERM` and `SIGINT` signals cleanly.

## Project Structure

```
├── src/
│   ├── config/          # Environment configuration
│   ├── controllers/     # Route controllers / logic handlers
│   ├── middlewares/     # Custom Express middlewares (error handling, 404)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Utilities (ApiError, ApiResponse, asyncHandler)
│   ├── app.ts           # Express app setup and middleware configuration
│   └── server.ts        # Server entrypoint and graceful shutdown listeners
├── .env                 # Environment variables
├── .env.example         # Example environment file
├── tsconfig.json        # TypeScript configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn / pnpm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start development server with hot reload:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run production build:
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server with hot-reloading using `tsx`.
- `npm run build` - Compile TypeScript to `dist/`.
- `npm start` - Run compiled JavaScript from `dist/server.js`.
- `npm run lint` - Run ESLint checks.
- `npm run lint:fix` - Automatically fix lint errors.
- `npm run format` - Format code with Prettier.
- `npm run clean` - Remove the `dist/` directory.

## Sample Endpoints

- `GET /` - Base root status endpoint
- `GET /api/v1/health` - System health check with uptime
- `GET /api/v1/sample` - Sample data endpoint
- `GET /api/v1/sample/error-test` - Endpoint demonstrating custom ApiError handling
