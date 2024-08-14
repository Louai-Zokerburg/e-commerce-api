import { login, logout, register } from '@/controllers/auth'
import { validatorMiddleware } from '@/middleware/validator'
import { registerSchema } from '@/schemas/auth'
import express from 'express'

export const router = express.Router()

router.post('/register', registerSchema, validatorMiddleware, register)
router.post('/login', login)
router.get('/logout', logout)
