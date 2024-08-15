import { productModel } from '@/models/product'
import type { TResponse } from '@/types/custom-response'
import type { AuthRequest } from '@/types/request'
import type { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const createProduct = async (req: AuthRequest, res: Response) => {
  const productData = matchedData(req)

  console.log(productData)

  const product = await productModel.create({ ...productData, user: req.user?.userId })

  const response: TResponse = {
    success: true,
    data: product,
    errors: undefined
  }

  res.status(StatusCodes.CREATED).json(response)
}

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await productModel.find({})

  const response: TResponse = {
    success: true,
    data: {
      products,
      count: products.length
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}
