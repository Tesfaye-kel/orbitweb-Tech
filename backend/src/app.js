import express from 'express'
import cors from 'cors'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { authRouter } from './routes/auth.routes.js'
import { userRouter } from './routes/user.routes.js'
import { abacRouter } from './routes/abac.routes.js'

export const app = express()

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'orbitweb-backend' })
})

app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'API running' })
})

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/abac', abacRouter)

// 404
app.use((_req, res) => {
  res.status(404).json({ ok: false, reason: 'Not Found' })
})

app.use(errorMiddleware)

