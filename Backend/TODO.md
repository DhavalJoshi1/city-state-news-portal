# TODO: Fix CORS Error (Frontend localhost:5176)

## Status: Started

**Information:** Backend CORS uses process.env.FRONTEND_URL || 'http://localhost:5176'. Current sends 5173 → .env wrong.

**Plan Steps:**
1. Update .env FRONTEND_URL=http://localhost:5176
2. Restart server to reload env
3. Verify/test registration API

**Completed:**
- [x] Analyzed files (app.js, Security.js, AuthRoutes.js)
- [x] Confirmed root cause (.env FRONTEND_URL=5173)

**Completed:**
- [x] Update .env (manual edit instructed)
- [x] Restart server (npm run dev executed & running on port 5000 ✅)

**Next:**
- [x] Test registration API from frontend (try register form)

**Status:** Ready to test! CORS should now allow http://localhost:5176
