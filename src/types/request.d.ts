import type { TUserPayload } from '@/types/user'
import type { Request } from 'express'

export interface AuthRequest extends Request {
  user?: TUserPayload
}
