import { ValidationError } from '@/errors'
import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validatorMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const errorMessages = errors.array().map(err => ({ message: err.msg }))

  throw new ValidationError(errorMessages)
}
