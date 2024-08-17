import type { Document, Types } from 'mongoose'

export interface TSingleOrderItem {
  name: string
  image: string
  price: number
  amount: number
  product: Types.ObjectId
}

export interface TOrder extends Document {
  tax: number
  shippingFee: number
  subtotal: number
  total: number
  orderItems: TSingleOrderItem[]
  status: 'pending' | 'failed' | 'paid' | 'delivered' | 'canceled'
  user: Types.ObjectId
  clientSecret: string
  paymentIntentId?: string
  createdAt?: Date
  updatedAt?: Date
}
