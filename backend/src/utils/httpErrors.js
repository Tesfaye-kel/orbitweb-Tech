export class HttpError extends Error {
  constructor(statusCode, code, message, details) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.details = details
  }
}

export function badRequest(code, message, details) {
  return new HttpError(400, code, message, details)
}

export function unauthorized(code, message, details) {
  return new HttpError(401, code, message, details)
}

export function notFound(code, message, details) {
  return new HttpError(404, code, message, details)
}

