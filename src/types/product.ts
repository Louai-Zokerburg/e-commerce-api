import type { TUser } from '@/types/user'
import type { Document } from 'mongoose'

export interface TProduct extends Document {
  name: string
  price: number
  description: string
  image: string
  category: string
  company: string
  colors: string[]
  featured: boolean
  freeShipping: boolean
  inventory: number
  averageRating: number
  numOfReviews: number
  user: TUser
}
