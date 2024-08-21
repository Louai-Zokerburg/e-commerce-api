import path from 'node:path'
import { NotFoundError } from '@/errors'
import { productModel } from '@/models/product'
import type { TResponse } from '@/types/custom-response'
import type { CustomRequest } from '@/types/request'
import type { Request, Response } from 'express'
import type fileUpload from 'express-fileupload'
import { matchedData } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const createProduct = async (req: CustomRequest, res: Response) => {
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

export const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = matchedData(req)

  const product = await productModel.findOne({ _id: id })

  if (!product) {
    throw new NotFoundError(`No product with id : ${id}`)
  }

  const response: TResponse = {
    success: true,
    data: {
      product
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id, ...updateProductData } = matchedData(req)

  const product = await productModel.findOneAndUpdate({ _id: id }, updateProductData, {
    new: true,
    runValidators: true
  })

  if (!product) {
    throw new NotFoundError(`No product with id : ${id}`)
  }

  const response: TResponse = {
    success: true,

    data: {
      product
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = matchedData(req)

  const product = await productModel.findOneAndDelete({ _id: id }, { new: true })

  if (!product) {
    throw new NotFoundError(`No product with id : ${id}`)
  }

  const response: TResponse = {
    success: true,
    data: {
      product
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}

export const uploadImage = async (req: Request, res: Response) => {
  const productImage = req.files!.image as fileUpload.UploadedFile

  const imagePath = path.join(__dirname, `../../public/uploads/${productImage.name}`)

  console.log(imagePath)

  await productImage.mv(imagePath)

  const response: TResponse = {
    success: true,
    data: {
      image: `Image uploaded successfully at: /uploads/${productImage.name}`
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}
