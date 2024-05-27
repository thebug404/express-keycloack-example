import { NextFunction, Request, Response } from "express";

import { KeycloakPermission } from "../declarations";

import { environments } from "../environments/environments";

const {
  KEYCLOAK_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID
} = environments

export const extractPermissions = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  
    const token = authorization.split(" ").at(-1)
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  
    const URI = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`
  
    const response = await fetch(URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      /**
       * For more information about the body parameters, check the Keycloak documentation:
       * https://www.keycloak.org/docs/latest/authorization_services/index.html#_service_obtaining_permissions
       */
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
        audience: KEYCLOAK_CLIENT_ID,
        response_mode: 'permissions'
      })
    })
  
    const data = await response.json()
  
    if (!response.ok) {
      return res.status(401).json(data)
    }
  
    const permissions: KeycloakPermission[] = data;

    if (!permissions || !permissions.length) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    (req as any).permissions = permissions

    next()
  }
}