import { body } from 'express-validator'

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('email must be a valid email')
    .normalizeEmail(),
  body('password')
    .isString()
    .isLength({ min: 8, max: 128 })
    .withMessage('password must be a string between 8 and 128 characters')
    .matches(/[A-Z]/)
    .withMessage('password must include at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('password must include at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('password must include at least one number'),
]

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('email must be a valid email')
    .normalizeEmail(),
  body('password')
    .isString()
    .isLength({ min: 8, max: 128 })
    .withMessage('password must be a string between 8 and 128 characters'),
]

