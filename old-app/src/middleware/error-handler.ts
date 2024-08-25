import { CustomAPIError, ValidationError } from '@/errors'
import type { TResponse } from '@/types/custom-response'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const errorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const response: TResponse = {
    success: false,
    errors: [{ message: 'Internal server error' }],
    data: null
  }

  if (err instanceof CustomAPIError) {
    response.errors = [{ message: err.message }]
  }
  if (err instanceof ValidationError) {
    response.errors = err.errorMessages
  }

  const statusCode = err instanceof CustomAPIError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR

  return res.status(statusCode).json(response)
}
