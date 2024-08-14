import { UnauthenticatedError } from '@/errors'
import { userModel } from '@/models/user'
import type { TResponse } from '@/types/custom-response'
import type { AuthRequest } from '@/types/request'
import { attachCookiesToResponse } from '@/utils/auth'
import type { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userModel.find({ role: 'user' }).select('-password')

  const response: TResponse = {
    success: true,
    data: {
      users
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  const response: TResponse = {
    success: true,
    data: {
      user: req.user
    },
    errors: undefined
  }
  res.status(StatusCodes.OK).json(response)
}

export const updateUser = async (req: AuthRequest, res: Response) => {
  const { email, name } = matchedData(req)

  const updatedUser = await userModel.findOneAndUpdate({ _id: req.user?.userId }, { email, name }, { new: true })

  if (!updatedUser) {
    throw new Error()
  }

  const tokenUser = {
    name: updatedUser.name,
    userId: updatedUser.id as string,
    role: updatedUser.role
  }

  attachCookiesToResponse({ res, user: tokenUser })

  const response: TResponse = {
    success: true,
    data: {
      user: tokenUser
    },
    errors: undefined
  }
  res.status(StatusCodes.OK).json(response)
}

export const updateUserPassword = async (req: AuthRequest, res: Response) => {
  const { oldPassword, newPassword } = matchedData(req)

  const user = await userModel.findOne({ _id: req.user!.userId })

  const isPasswordCorrect = await user?.comparePassword(oldPassword)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  user!.password = newPassword

  await user!.save()

  const response: TResponse = {
    success: true,
    data: {
      message: 'Success! Password Updated.'
    },
    errors: undefined
  }
  res.status(StatusCodes.OK).json(response)
}
