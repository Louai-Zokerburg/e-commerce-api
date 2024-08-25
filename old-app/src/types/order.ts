import type mongoose from 'mongoose'
import type { Document } from 'mongoose'

export interface TSingleOrderItem {
  name: string
  image: string
  price: number
  amount: number
  product: mongoose.Schema.Types.ObjectId
}

export interface TOrder extends Document {
  tax: number
  shippingFee: number
  subtotal: number
  total: number
  orderItems: TSingleOrderItem[]
  status: 'pending' | 'failed' | 'paid' | 'delivered' | 'canceled'
  user: mongoose.Schema.Types.ObjectId
  clientSecret: string
  paymentIntentId?: string
  createdAt?: Date
  updatedAt?: Date
}
