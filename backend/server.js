import express from 'express'
import cors from 'cors'
import { evaluateAbac } from './express-abac.js'

const app = express()

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'orbitweb-abac-backend' })
})

app.post('/abac/authorize', (req, res) => {
  try {
    const result = evaluateAbac(req.body)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(400).json({
      permit: false,
      matchedRules: [],
      reason: err?.message || 'Invalid ABAC input',
    })
  }
})

app.use((_req, res) => {
  res.status(404).json({ ok: false, reason: 'Not Found' })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ABAC backend listening on http://localhost:${PORT}`)
})

