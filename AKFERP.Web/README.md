# AKFERP.Web

React 18 + TypeScript + Vite frontend with a loosely coupled folder layout, React Router, Context-based auth and theme, Axios API client, and a small toast/notification service.

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env`.

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Optional absolute API base (e.g. `https://api.example.com`). Leave empty in dev to use same-origin `/api` + Vite proxy. |
| `VITE_USE_MOCK_AUTH` | `true` = in-browser demo auth; `false` = call `AKFERP.API` `/api/auth/login` and `/api/auth/register`. |

**Mock login:** `demo@akferp.local` / `Demo@123`

**Real API:** Start `AKFERP.API` (HTTPS `https://localhost:7192` per `launchSettings.json`). The Vite dev server proxies `/api` to that URL.

## Folder structure

| Path | Role |
|------|------|
| `src/components` | Reusable UI (e.g. `auth/PrivateRoute`, `layout/MainLayout`) |
| `src/pages` | Route-level screens |
| `src/services` | API (`apiClient`, `authService`), `notificationService` |
| `src/hooks` | Thin re-exports / custom hooks |
| `src/context` | Global providers (auth, theme, toast) |
| `src/routes` | `AppRoutes` route table |
| `src/types` | Shared TS types |
| `src/utils` | Helpers (e.g. auth storage) |
| `src/constants` | Storage keys, etc. |

## Theming

`ThemeProvider` sets `document.documentElement.dataset.theme` to `light` or `dark`. Tokens live in `src/index.css` under `:root` / `[data-theme='dark']`. Extend these variables when you formalize a design system.

## Backend contract

Auth responses follow `ApiResponse<AuthResponseDto>` from AKFERP (`accessToken`, `userId`, `email`, `roles`, `expiresAtUtc`). Update `src/types` and `authService` if the API changes.
