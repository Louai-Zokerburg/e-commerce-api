import { CustomAPIError } from '@/errors'
import type { TResponse } from '@/types/response'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const errorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err)

  const response: TResponse = {
    success: false,
    error: {
      message: err instanceof CustomAPIError ? err.message : 'Unexpected Error happened'
    },
    data: null
  }

  const statusCode = err instanceof CustomAPIError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR

  return res.status(statusCode).json(response)
}
