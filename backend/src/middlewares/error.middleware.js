import { HttpError } from '../utils/httpErrors.js'

export function errorMiddleware(err, _req, res, _next) {
  // 👈 IT MUST GO RIGHT HERE (Inside the function)
  console.error("🚨 CRASH DETAILS:", err);

  const isHttpError = err instanceof HttpError
  
  const statusCode = isHttpError ? err.statusCode : 500
  const code = isHttpError ? err.code : 'INTERNAL_SERVER_ERROR'
  const message = isHttpError ? err.message : 'Internal Server Error'

  const details = isHttpError ? err.details : undefined

  res.status(statusCode).json({
    ok: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  })
}