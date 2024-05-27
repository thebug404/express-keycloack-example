import express from 'express'

import { keycloack } from './config/keycloack'
import { environments } from './environments/environments'

import batchesRouter from './batches/batches.routes'

// Extract keycloack env
const {
  PORT,

  KEYCLOAK_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET
} = environments

// Validate env variables
if (!KEYCLOAK_URL || !KEYCLOAK_REALM || !KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
  throw new Error('Missing keycloak env variables')
}

// Create express app
const app = express()

// Register keycloack middleware
app.use(keycloack.middleware())

// Register batches router
app.use('/batches', batchesRouter)

// Start express app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
