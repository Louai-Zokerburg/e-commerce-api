import { checkSchema } from 'express-validator'

export const updateUserValidationSchema = checkSchema({
  name: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Name must be provided'
    },
    isLength: {
      options: { min: 2 },
      errorMessage: 'Name must be at least 2 characters long'
    }
  },

  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Invalid email address'
    },
    normalizeEmail: true
  }
})

export const updatePasswordValidationSchema = checkSchema({
  oldPassword: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name must be provided'
    }
  },

  newPassword: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long'
    }
  }
})
