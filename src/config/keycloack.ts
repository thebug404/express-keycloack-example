import Keycloack from 'keycloak-connect'
import session from 'express-session'

import { environments } from '../environments/environments'

// Extract keycloack env
const { KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID } = environments

// Create session middleware
const memoryStore = new session.MemoryStore()

// Create keycloak instance
export const keycloack = new Keycloack(
  { store: memoryStore },
  {
    'confidential-port': 0,
    'auth-server-url': KEYCLOAK_URL,
    'ssl-required': 'external',
    resource: KEYCLOAK_CLIENT_ID,
    realm: KEYCLOAK_REALM,
    // 'bearer-only'?: boolean
  }
)