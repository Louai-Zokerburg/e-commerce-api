import { NotFoundError } from '@/errors'
import type { Request, Response } from 'express'

export const notFound = (_req: Request, _res: Response) => {
  throw new NotFoundError("Route doesn't exist")
}
