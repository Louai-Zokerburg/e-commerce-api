import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage
} from '@/controllers/product'
import { getSingleProductReviews } from '@/controllers/review'
import { authenticateUser, authorizePermissions } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import {
  createProductValidationSchema,
  getProductValidationSchema,
  imageUploadSchemaValidation,
  updateProductValidationSchema
} from '@/schemas/product'
import { getSingleReviewsSchema } from '@/schemas/review'
import express from 'express'

export const router = express.Router()

router
  .route('/products')
  .post(
    [authenticateUser, authorizePermissions(['admin'])],
    createProductValidationSchema,
    validatorMiddleware,
    createProduct
  )
  .get(getAllProducts)

router
  .route('/products/image')
  .post(
    [authenticateUser, authorizePermissions(['admin'])],
    imageUploadSchemaValidation,
    validatorMiddleware,
    uploadImage
  )

router
  .route('/products/:id')
  .get(getProductValidationSchema, validatorMiddleware, getSingleProduct)
  .post(
    authenticateUser,
    authorizePermissions(['admin']),
    getProductValidationSchema,
    updateProductValidationSchema,
    validatorMiddleware,
    updateProduct
  )
  .delete(
    authenticateUser,
    authorizePermissions(['admin']),
    getProductValidationSchema,
    validatorMiddleware,
    deleteProduct
  )

router.route('/products/:id/reviews').get(getSingleReviewsSchema, validatorMiddleware, getSingleProductReviews)
