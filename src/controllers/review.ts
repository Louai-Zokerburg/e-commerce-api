import { BadRequestError, NotFoundError } from '@/errors'
import { productModel } from '@/models/product'
import { reviewModel } from '@/models/review'
import type { TResponse } from '@/types/custom-response'
import type { CustomRequest } from '@/types/request'
import type { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const createReview = async (req: CustomRequest, res: Response) => {
  const data = matchedData(req)

  const isValidProduct = await productModel.findOne({ _id: data.product })

  if (!isValidProduct) {
    throw new NotFoundError(`No product with id : ${data.product}`)
  }

  const alreadySubmitted = await reviewModel.findOne({
    product: data.product,
    user: req.user!.userId
  })

  if (alreadySubmitted) {
    throw new BadRequestError('Already submitted review for this product')
  }

  req.body.user = req.user!.userId

  const review = await reviewModel.create(data)

  const response: TResponse = {
    success: true,
    data: {
      review
    },
    errors: undefined
  }

  res.status(StatusCodes.CREATED).json(response)
}

export const getAllReviews = async (_req: Request, res: Response) => {
  const reviews = await reviewModel.find({}).populate({
    path: 'product',
    select: 'name company price'
  })

  const response: TResponse = {
    success: true,
    data: {
      reviews,
      count: reviews.length
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}
