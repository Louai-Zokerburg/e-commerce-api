import { createReview, deleteReview, getAllReviews, getSingleReview, updateReview } from '@/controllers/review'
import { authenticateUser } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import {
  createReviewValidationSchema,
  deleteReviewsSchema,
  getSingleReviewsSchema,
  updateReviewSchemaValidation
} from '@/schemas/review'
import express from 'express'

export const router = express.Router()

router
  .route('/reviews/')
  .post(authenticateUser, createReviewValidationSchema, validatorMiddleware, createReview)
  .get(getAllReviews)

router
  .route('/reviews/:id')
  .get(getSingleReviewsSchema, validatorMiddleware, getSingleReview)
  .patch(authenticateUser, updateReviewSchemaValidation, validatorMiddleware, updateReview)
  .delete(authenticateUser, deleteReviewsSchema, validatorMiddleware, deleteReview)
