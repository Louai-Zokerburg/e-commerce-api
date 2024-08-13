import { UnauthenticatedError } from '@/errors'
import { validateToken } from '@/utils/auth'
import type { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

export const authenticateUser = async (req: Request, _res: Response, next: NextFunction) => {
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
