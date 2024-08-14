import { getAllUsers, getCurrentUser, updateUser, updateUserPassword } from '@/controllers/user'
import { authenticateUser, authorizePermissions } from '@/middleware/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { updatePasswordValidationSchema, updateUserValidationSchema } from '@/schemas/user'
import express from 'express'

export const router = express.Router()

router.route('/').get(authenticateUser, authorizePermissions(['admin']), getAllUsers)
router.route('/me').get(authenticateUser, getCurrentUser)
router.route('/update-user').patch(authenticateUser, updateUserValidationSchema, validatorMiddleware, updateUser)
router
  .route('/update-password')
  .patch(authenticateUser, updatePasswordValidationSchema, validatorMiddleware, updateUserPassword)
