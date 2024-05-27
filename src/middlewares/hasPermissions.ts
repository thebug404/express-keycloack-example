import { NextFunction, Request, Response } from "express"
import { KeycloakPermission } from "../declarations"

export const hasPermissions = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const keycloakPermissions = (req as any).permissions as KeycloakPermission[]

    if (!keycloakPermissions) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const _permissions = permissions.map((p) => {
      const [resource, scope] = p.split(':')
      return { resource, scope }
    })
    
    const hasAccess = _permissions.some((p) => {
      const { resource, scope } = p
      const _resource = keycloakPermissions.find((item) => item.rsname === resource)
      
      if (!_resource || !_resource.scopes) {
        return false
      }
  
      return _resource.scopes.includes(scope)
    })

    if (!hasAccess) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  }
}
