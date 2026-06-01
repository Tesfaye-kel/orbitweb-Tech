import { validationResult } from 'express-validator'
import { badRequest } from '../utils/httpErrors.js'

export function validateRequest(req) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    throw badRequest(
      'VALIDATION_ERROR',
      'Request validation failed',
      result.array().map((e) => ({ field: e.param, message: e.msg }))
    )
  }
}

