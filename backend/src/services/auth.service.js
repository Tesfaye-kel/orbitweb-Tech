import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { signAccessToken } from '../utils/jwt.js'
import { env } from '../config/env.js'
import { badRequest, unauthorized } from '../utils/httpErrors.js'

function normalizeEmail(email) {
  return String(email).trim().toLowerCase()
}

export async function registerUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email)

  const existing = await User.findOne({ email: normalizedEmail })
  if (existing) {
    throw badRequest('EMAIL_TAKEN', 'Email is already registered')
  }

  const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)

  const user = await User.create({
    email: normalizedEmail,
    passwordHash,
    roles: ['user'],
  })

  const accessToken = signAccessToken({
    sub: user._id,
    email: user.email,
    roles: user.roles,
  })

  return {
    user: {
      id: user._id,
      email: user.email,
      roles: user.roles,
    },
    accessToken,
  }
}

export async function loginUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email)

  const user = await User.findOne({ email: normalizedEmail })
  if (!user) {
    throw unauthorized('INVALID_CREDENTIALS', 'Invalid email or password')
  }

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) {
    throw unauthorized('INVALID_CREDENTIALS', 'Invalid email or password')
  }

  const accessToken = signAccessToken({
    sub: user._id,
    email: user.email,
    roles: user.roles,
  })

  return {
    user: {
      id: user._id,
      email: user.email,
      roles: user.roles,
    },
    accessToken,
  }
}

