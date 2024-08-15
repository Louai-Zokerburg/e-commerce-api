import { createProduct, getAllProducts, getSingleProduct } from '@/controllers/product'
import { authenticateUser, authorizePermissions } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { createProductValidationSchema, getProductValidationSchema } from '@/schemas/product'
import express from 'express'

export const router = express.Router()

router
  .route('/')
  .post(
    [authenticateUser, authorizePermissions(['admin'])],
    createProductValidationSchema,
    validatorMiddleware,
    createProduct
  )
  .get(getAllProducts)

router.route('/:id').get(getProductValidationSchema, validatorMiddleware, getSingleProduct)
