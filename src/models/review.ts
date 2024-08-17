import { productModel } from '@/models/product'
import type { TReview } from '@/types/review'
import mongoose, { Schema, type Model } from 'mongoose'

interface TReviewModel extends Model<TReview> {
  calculateAverageRating(productId: mongoose.Schema.Types.ObjectId): Promise<void>
}

const ReviewSchema: Schema<TReview, TReviewModel> = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating']
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  { timestamps: true }
)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

ReviewSchema.statics.calculateAverageRating = async function (
  this: TReviewModel,
  productId: mongoose.Schema.Types.ObjectId
) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 }
      }
    }
  ])

  try {
    await productModel.findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0
      }
    )
  } catch (error) {
    console.log(error)
  }
}

ReviewSchema.post<TReview>('save', async function () {
  await (this.constructor as TReviewModel).calculateAverageRating(this.product)
})

ReviewSchema.post<TReview>('findOneAndDelete', async (doc, next) => {
  const reviewDoc = doc as unknown as TReview | null

  if (reviewDoc) {
    await (reviewDoc.constructor as TReviewModel).calculateAverageRating(reviewDoc.product)
  }

  next()
})

// Export the model with the TReview interface
export const reviewModel: Model<TReview> = mongoose.model<TReview>('Review', ReviewSchema)
