import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDB() {
  const mongooseOptions = {
    autoIndex: env.NODE_ENV !== 'production',
  }

  // Helpful startup error context (avoid silent failures)
  try {
    await mongoose.connect(env.MONGODB_URI, mongooseOptions)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Mongo connect failed:', err?.code || err?.message)
    throw err
  }
}


