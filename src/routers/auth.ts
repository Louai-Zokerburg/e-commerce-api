import { register } from '@/controllers/auth'
import express from 'express'

export const router = express.Router()

router.post('/register', register)
