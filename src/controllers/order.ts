import { BadRequestError, NotFoundError } from '@/errors'
import { orderModel } from '@/models/order'
import { productModel } from '@/models/product'
import type { TResponse } from '@/types/custom-response'
import type { CustomRequest } from '@/types/request'
import { checkPermissions } from '@/utils/auth'
import type { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import type mongoose from 'mongoose'

interface FakeStripeAPIResponse {
  client_secret: string
  amount: number
}

const fakeStripeAPI = async ({
  amount
}: {
  amount: number
  currency: string
}): Promise<FakeStripeAPIResponse> => {
  const client_secret = 'someRandomValue'
  return { client_secret, amount }
}

interface SingleOrderItem {
  amount: number
  name: string
  price: number
  image: string
  product: mongoose.ObjectId
}

export const createOrder = async (req: CustomRequest, res: Response): Promise<void> => {
  const { items: cartItems, tax, shippingFee } = matchedData(req)

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided')
  }

  const orderItems: SingleOrderItem[] = []
  let subtotal = 0

  for (const item of cartItems) {
    const dbProduct = await productModel.findOne({ _id: item.product })

    if (!dbProduct) {
      throw new NotFoundError(`No product with id : ${item.product}`)
    }

    const { name, price, image, _id } = dbProduct

    const singleOrderItem: SingleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id as mongoose.ObjectId
    }
    orderItems.push(singleOrderItem)
    subtotal += item.amount * price
  }

  const total = tax + shippingFee + subtotal
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd'
  })

  const order = await orderModel.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user!.userId
  })

  const response: TResponse = {
    success: true,
    data: {
      order,
      clientSecret: order.clientSecret
    },
    errors: undefined
  }

  res.status(StatusCodes.CREATED).json(response)
}

export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  const orders = await orderModel.find({})

  const response: TResponse = {
    success: true,
    data: {
      orders,
      count: orders.length
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}

export const getSingleOrder = async (req: CustomRequest, res: Response): Promise<void> => {
  const { id: orderId } = req.params

  const order = await orderModel.findOne({ _id: orderId })

  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`)
  }

  checkPermissions(req.user!, order.user)

  const response: TResponse = {
    success: true,
    data: {
      order
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}

export const getCurrentUserOrders = async (req: CustomRequest, res: Response): Promise<void> => {
  const orders = await orderModel.find({ user: req.user!.userId })

  const response: TResponse = {
    success: true,
    data: {
      orders,
      count: orders.length
    },
    errors: undefined
  }
  res.status(StatusCodes.OK).json(response)
}

export const updateOrder = async (req: CustomRequest, res: Response): Promise<void> => {
  const { id: orderId } = req.params

  const { paymentIntentId } = matchedData(req)

  const order = await orderModel.findOne({ _id: orderId })
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`)
  }

  checkPermissions(req.user!, order.user)

  order.paymentIntentId = paymentIntentId
  order.status = 'paid'
  await order.save()

  const response: TResponse = {
    success: true,
    data: {
      order
    },
    errors: undefined
  }

  res.status(StatusCodes.OK).json(response)
}
