/**
 * Small helper to sanity-check a MongoDB URI shape for SRV connections.
 *
 * This is intentionally conservative to avoid accidental malformed URIs.
 */

export function assertMongoUriSanity(uri) {
  if (typeof uri !== 'string' || uri.trim().length === 0) {
    throw new Error('MONGODB_URI must be a non-empty string')
  }

  const v = uri.trim()

  if (!v.startsWith('mongodb+srv://')) {
    throw new Error('MONGODB_URI must start with mongodb+srv://')
  }

  if (/\s/.test(v)) {
    throw new Error('MONGODB_URI must be a single line (no whitespace)')
  }

  // Expected shape (Atlas connect string):
  // mongodb+srv://<username>:<password>@<host>/<db>?<options>
  // Atlas sometimes omits /<db>; still must have an @<host>.
  const withoutProto = v.replace(/^mongodb\+srv:\/\//, '')
  if (!withoutProto.includes('@')) {
    throw new Error('MONGODB_URI must include @host')
  }

  // Disallow common copy/paste mistakes where extra tokens are appended.
  // If the URI contains "appName=" but also ends with strange trailing chars, it will fail.
  if (v.includes('appName=') && v.includes('  ')) {
    throw new Error('MONGODB_URI appears to contain double spaces')
  }

  return true
}

