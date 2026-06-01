import { asyncHandler } from '../utils/asyncHandler.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { loginUser, registerUser } from '../services/auth.service.js'

export const register = asyncHandler(async (req, res) => {
  validateRequest(req)

  const result = await registerUser({
    email: req.body.email,
    password: req.body.password,
  })

  return res.status(201).json({
    ok: true,
    ...result,
  })
})

export const login = asyncHandler(async (req, res) => {
  validateRequest(req)

  const result = await loginUser({
    email: req.body.email,
    password: req.body.password,
  })

  return res.status(200).json({
    ok: true,
    ...result,
  })
})

