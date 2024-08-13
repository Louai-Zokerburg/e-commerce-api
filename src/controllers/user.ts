import { userModel } from '@/models/user'
import type { TResponse } from '@/types/custom-response'
import type { AuthRequest } from '@/types/request'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userModel.find({ role: 'user' }).select('-password')

  const response: TResponse = {
    success: true,
    data: {
      users
    },
    error: undefined
  }

  res.status(StatusCodes.OK).json(response)
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  const response: TResponse = {
    success: true,
    data: {
      user: req.user
    },
    error: undefined
  }
  res.status(StatusCodes.OK).json(response)
}
