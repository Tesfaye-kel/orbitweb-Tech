import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { me } from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.get('/me', requireAuth, me)

