import { Router } from 'express'
import { evaluateAbac } from '../../express-abac.js'

export const abacRouter = Router()

abacRouter.post('/authorize', (req, res) => {
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

