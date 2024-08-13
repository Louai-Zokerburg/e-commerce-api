import type { TResponse } from '@/types/custom-response'
import type { Request, Response } from 'express'

export const notFound = (_: Request, res: Response) => {
  const response: TResponse = {
    success: false,
    error: {
      message: "Route doesn't exist"
    },
    data: undefined
  }
  res.status(404).json(response)
}
