import { login, logout, register } from '@/controllers/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { loginValidationSchema, registerValidationSchema } from '@/schemas/auth'
import express from 'express'

export const router = express.Router()

router.post('/auth/register', registerValidationSchema, validatorMiddleware, register)
router.post('/auth/login', loginValidationSchema, validatorMiddleware, login)
router.get('/auth/logout', logout)
