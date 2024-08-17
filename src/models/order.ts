import type { TOrder, TSingleOrderItem } from '@/types/order'
import mongoose, { Schema } from 'mongoose'

const SingleOrderItemSchema: Schema<TSingleOrderItem> = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
})

const OrderSchema: Schema<TOrder> = new Schema(
  {
    tax: {
      type: Number,
      required: true
    },
    shippingFee: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    clientSecret: {
      type: String,
      required: true
    },
    paymentIntentId: {
      type: String
    }
  },
  { timestamps: true }
)

export default mongoose.model<TOrder>('Order', OrderSchema)
