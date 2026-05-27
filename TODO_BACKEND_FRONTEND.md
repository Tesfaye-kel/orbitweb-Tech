# TODO: Split into backend/ and frontend/

- [ ] Create `backend/` folder and move:
  - `server.js`
  - `express-abac.js`
- [ ] Create `frontend/` folder and move:
  - `index.html`, `vite.config.js`
  - `src/`
  - `public/`
  - `tailwind.config.js`, `postcss.config.js`
  - `index.css` already inside `src/`
- [ ] Update `package.json` scripts to run:
  - frontend dev/build from `frontend/`
  - backend dev from `backend/`
- [ ] Update backend imports/paths if needed.
- [ ] Update frontend API base usage:
  - keep `.env` at repo root OR move into `frontend/` and update Vite usage.
- [ ] Add `frontend/package.json` and `backend/package.json` (optional) OR keep single root dependencies (simpler).
- [ ] Verify:
  - `npm run dev` starts frontend
  - `npm run dev:server` starts backend
  - UI call to `/abac/authorize` still works

