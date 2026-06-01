import { Router } from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { loginValidator, registerValidator } from '../validators/auth.validators.js'

export const authRouter = Router()

authRouter.post('/register', registerValidator, register)
authRouter.post('/login', loginValidator, login)

