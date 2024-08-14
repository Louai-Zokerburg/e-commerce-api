import { BadRequestError, UnauthenticatedError } from '@/errors'
import { userModel } from '@/models/user'
import type { TResponse } from '@/types/custom-response'
import type { AuthRequest } from '@/types/request'
import { attachCookiesToResponse } from '@/utils/auth'
import type { Request, Response } from 'express'
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
  const { email, name } = req.body

  if (!email || !name) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await userModel.findOne({ _id: req.user!.userId })

  user!.email = email
  user!.name = name

  await user!.save()

  const tokenUser = {
    name: user!.name,
    userId: user!._id as string,
    role: user!.role
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
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both values')
  }
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
