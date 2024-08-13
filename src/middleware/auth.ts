import { UnauthenticatedError, UnauthorizedError } from '@/errors'
import type { AuthRequest } from '@/types/request'
import { validateToken } from '@/utils/auth'
import type { NextFunction, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

export const authenticateUser = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new UnauthenticatedError('Token not provided')
  }

  try {
    const { name, userId, role } = validateToken({ token }) as JwtPayload
    req.user = { name, userId, role }
    next()
  } catch (_err) {
    throw new UnauthenticatedError('Invalid token')
  }
}

export const authorizePermissions = (roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next()
  }
}
