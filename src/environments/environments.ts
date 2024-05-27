import { config } from 'dotenv'

config()

export const environments = {
  PORT: process.env.PORT || 3000,

  KEYCLOAK_URL: process.env.KEYCLOAK_URL || 'http://localhost:8080',
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM || 'master',
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || 'admin-cli',
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET || 'admin-cli',
}
