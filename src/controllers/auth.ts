import { UnauthenticatedError } from '@/errors'
import { userModel } from '@/models/user'
import { attachCookiesToResponse } from '@/utils/auth'
import { StatusCodes } from 'http-status-codes'

import type { TResponse } from '@/types/custom-response'
import type { Request, Response } from 'express'
import { matchedData } from 'express-validator'

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = matchedData(req)

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
    errors: undefined,
    data: {
      user: tokenUser
    }
  }
  res.status(StatusCodes.CREATED).json(response)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = matchedData(req)

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
    errors: undefined,
    data: {
      user: tokenUser
    }
  }

  res.status(StatusCodes.OK).json(response)
}

export const logout = async (_req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now() + 1)
  })

  const response: TResponse = {
    success: true,
    data: {
      message: 'User logged out!'
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}
