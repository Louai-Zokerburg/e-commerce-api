import type { TUser } from '@/types/user'
import bcrypt from 'bcryptjs'
import mongoose, { type Schema } from 'mongoose'
import validator from 'validator'

const UserSchema: Schema<TUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email field is required'],
    validate: {
      validator: validator.isEmail,
      message: 'Provide a valid email address'
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } as any
  },
  password: {
    type: String,
    required: [true, 'Password Field is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (this: TUser, candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export const userModel = mongoose.model<TUser>('User', UserSchema)
