# PlanetVerse Backend — Express + MySQL

Real REST API for the PlanetVerse learning universe.

## Structure

```text
backend/
├── config/          # Environment configuration
├── controllers/     # Request handlers
├── db/              # MySQL pool
├── middleware/      # Validation + errors
├── routes/          # Express routes
├── services/        # SQL queries (parameterized)
├── .env.example
├── package.json
└── server.js
```

## Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
npm install
npm run dev
```

API base: `http://localhost:5001/api`
