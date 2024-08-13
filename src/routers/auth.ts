import { login, logout, register } from '@/controllers/auth'
import express from 'express'

export const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
