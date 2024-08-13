import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'

import morgan from 'morgan'

import { router as authRouter } from '@/routers/auth'
import connectDB from '@/utils/db-connect'
import rateLimit from 'express-rate-limit'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xssClean from 'xss-clean'
import { errorHandlerMiddleware } from './middleware/error-handler'
import { notFound } from './middleware/not-found'

// Express app
const app = express()

// Logging
app.use(process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('common'))

// Rate Limiting
app.set('trust proxy', 1)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60
  })
)

// Security
app.use(helmet())
app.use(cors())
app.use(xssClean())
app.use(mongoSanitize())

// json body and cookie parser
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

// Routers
app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || '')
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
