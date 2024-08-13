import type { CustomAPIError } from '@/errors'
import type { TResponse } from '@/types/response'
import type { NextFunction, Request, Response } from 'express'

export const errorHandlerMiddleware = (err: CustomAPIError, _req: Request, res: Response, _next: NextFunction) => {
  const response: TResponse = {
    success: false,
    error: {
      message: err.message
    },
    data: null
  }

  return res.status(err.statusCode).json(response)
}
