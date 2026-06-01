import { app } from './app.js'
import { connectDB } from './config/db.js'
import { env } from './config/env.js'

async function main() {
  await connectDB()

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${env.PORT}`)
  })
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err)
  process.exit(1)
})



