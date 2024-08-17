import type mongoose from 'mongoose'
import type { Document } from 'mongoose'

export interface TReview extends Document {
  rating: number
  title: string
  comment: string
  user: mongoose.Schema.Types.ObjectId
  product: mongoose.Schema.Types.ObjectId
}
