import { createOrder, getAllOrders, getCurrentUserOrders, getSingleOrder, updateOrder } from '@/controllers/order'
import { authenticateUser, authorizePermissions } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { createOrderSchema, updateOrderSchema } from '@/schemas/order'
import express from 'express'

export const router = express.Router()

router
  .route('/orders')
  .post(authenticateUser, createOrderSchema, validatorMiddleware, createOrder)
  .get(authenticateUser, authorizePermissions(['admin']), getAllOrders)

router.route('/orders/my-orders').get(authenticateUser, getCurrentUserOrders)

router
  .route('/orders/:id')
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrderSchema, validatorMiddleware, updateOrder)
