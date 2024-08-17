import type { TUserPayload } from '@/types/user'
import type { Request } from 'express'

export interface CustomRequest extends Request {
  user?: TUserPayload
}
