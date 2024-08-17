import { createReview, getAllReviews, getSingleReview } from '@/controllers/review'
import { authenticateUser } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { createReviewValidationSchema, getSingleReviewsSchema } from '@/schemas/review'
import express from 'express'

export const router = express.Router()

router
  .route('/')
  .post(authenticateUser, createReviewValidationSchema, validatorMiddleware, createReview)
  .get(getAllReviews)

router.route('/:id').get(getSingleReviewsSchema, validatorMiddleware, getSingleReview)
