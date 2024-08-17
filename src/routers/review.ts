import { createReview, getAllReviews } from '@/controllers/review'
import { authenticateUser } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { createReviewValidationSchema } from '@/schemas/review'
import express from 'express'

export const router = express.Router()

router
  .route('/')
  .post(authenticateUser, createReviewValidationSchema, validatorMiddleware, createReview)
  .get(getAllReviews)
