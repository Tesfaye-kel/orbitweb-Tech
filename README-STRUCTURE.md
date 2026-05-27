# Project structure

## Frontend (Vite + React)
- `src/` – React app
- `src/pages/*` – route pages
- `src/components/*` – reusable components
- `src/context/*` – React contexts

Run: `npm run dev`

## Backend (Express)
- `server.js` – Express entrypoint
- `express-abac.js` – ABAC evaluator used by the backend

Run: `npm run dev:server`

---

## Suggested next step (optional)
If you want a cleaner layout, move backend files into a folder like `backend/` and frontend into `frontend/`.

