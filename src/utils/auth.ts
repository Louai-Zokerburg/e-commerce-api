import type { TTokenUser } from '@/types/user'
import type { Response } from 'express'
import jwt from 'jsonwebtoken'

export const validateToken = ({ token }: { token: string }) => jwt.verify(token, process.env.JWT_SECRET || '')

export const createJWT = ({ payload }: { payload: TTokenUser }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_LIFETIME
  })
  return token
}

export const attachCookiesToResponse = ({ res, user }: { res: Response; user: TTokenUser }) => {
  const token = createJWT({ payload: user })

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true
  })
}
