import { verifyAccessToken } from '../utils/jwt.js'
import { unauthorized } from '../utils/httpErrors.js'

function extractBearerToken(headerValue) {
  if (!headerValue) return null
  const parts = String(headerValue).split(' ')
  if (parts.length !== 2) return null
  const [scheme, token] = parts
  if (scheme.toLowerCase() !== 'bearer') return null
  return token
}

export function requireAuth(req, _res, next) {
  try {
    const token = extractBearerToken(req.headers.authorization)
    if (!token) {
      throw unauthorized('NO_TOKEN', 'Authorization token missing')
    }

    const decoded = verifyAccessToken(token)

    // decoded has: sub, email, roles, iat, exp
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      roles: decoded.roles,
    }

    return next()
  } catch (err) {
    return next(unauthorized('INVALID_TOKEN', err?.message || 'Invalid token'))
  }
}

