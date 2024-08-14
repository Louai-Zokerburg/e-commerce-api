import { createProduct } from '@/controllers/product'
import { authenticateUser, authorizePermissions } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { productValidationSchema } from '@/schemas/product'
import express from 'express'

export const router = express.Router()

router
  .route('/')
  .post(
    [authenticateUser, authorizePermissions(['admin'])],
    productValidationSchema,
    validatorMiddleware,
    createProduct
  )
