import { z } from 'zod'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { assertMongoUriSanity } from './mongoUriSanity.js'


// Ensure we load backend/.env regardless of where the process is started from
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(z.number().int().positive())
    .optional(),

  // Flexible check: Accepts standard local addresses OR cloud srv links
  MONGODB_URI: z
    .string()
    .min(1)
    .refine((v) => v.startsWith('mongodb+srv://') || v.startsWith('mongodb://'), {
      message: 'MONGODB_URI must start with mongodb:// or mongodb+srv://'
    })
    .refine((v) => {
      // Only run the deep cloud verification if it is actually an Atlas link
      if (v.startsWith('mongodb+srv://')) {
        assertMongoUriSanity(v)
      }
      return true
    }, {
      message: 'MONGODB_URI appears malformed'
    }),


  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1).default('15m'),
  BCRYPT_SALT_ROUNDS: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(z.number().int().positive())
    .optional()
    .default('12'),
})


const parsed = envSchema.safeParse(process.env)
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = {
  NODE_ENV: parsed.data.NODE_ENV,
  PORT: parsed.data.PORT ?? 4000,
  MONGODB_URI: parsed.data.MONGODB_URI,
  JWT_ACCESS_SECRET: parsed.data.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: parsed.data.JWT_ACCESS_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS: parsed.data.BCRYPT_SALT_ROUNDS,
}