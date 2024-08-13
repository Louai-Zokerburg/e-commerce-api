import { BadRequestError, UnauthenticatedError } from '@/errors'
import { userModel } from '@/models/user'
import { attachCookiesToResponse } from '@/utils/auth'
import { StatusCodes } from 'http-status-codes'

import type { TResponse } from '@/types/response'
import type { Request, Response } from 'express'

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body

  const emailAlreadyExists = await userModel.findOne({ email })
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists')
  }

  // first registered user is an admin
  const isFirstAccount = (await userModel.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await userModel.create({ name, email, password, role })
  const tokenUser = {
    name: user.name,
    userId: user._id as string,
    role: user.role
  }

  attachCookiesToResponse({ res, user: tokenUser })

  const response: TResponse = {
    success: true,
    error: undefined,
    data: {
      user: tokenUser
    }
  }
  res.status(StatusCodes.CREATED).json(response)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await userModel.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const tokenUser = {
    name: user.name,
    userId: user._id as string,
    role: user.role
  }
  attachCookiesToResponse({ res, user: tokenUser })

  const response: TResponse = {
    success: true,
    error: undefined,
    data: {
      user: tokenUser
    }
  }

  res.status(StatusCodes.OK).json(response)
}
