import { getAllUsers } from '@/controllers/user'
import { authenticateUser, authorizePermissions } from '@/middleware/auth'
import express from 'express'

export const router = express.Router()

router.route('/').get(authenticateUser, authorizePermissions(['admin']), getAllUsers)
