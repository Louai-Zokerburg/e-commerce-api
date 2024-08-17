import { checkSchema } from 'express-validator'
import mongoose from 'mongoose'

export const createReviewValidationSchema = checkSchema({
  rating: {
    in: ['body'],
    isInt: {
      options: { min: 1, max: 5 },
      errorMessage: 'Rating must be an integer between 1 and 5'
    },
    notEmpty: {
      errorMessage: 'Please provide rating'
    }
  },
  title: {
    in: ['body'],
    isString: {
      errorMessage: 'Title must be a string'
    },
    trim: true,
    notEmpty: {
      errorMessage: 'Please provide review title'
    },
    isLength: {
      options: { max: 100 },
      errorMessage: 'Title must be at most 100 characters long'
    }
  },
  comment: {
    in: ['body'],
    isString: {
      errorMessage: 'Comment must be a string'
    },
    notEmpty: {
      errorMessage: 'Please provide review text'
    }
  },
  user: {
    in: ['body'],
    custom: {
      options: value => mongoose.Types.ObjectId.isValid(value),
      errorMessage: 'Invalid user ID'
    },
    notEmpty: {
      errorMessage: 'User ID is required'
    }
  },
  product: {
    in: ['body'],
    custom: {
      options: value => mongoose.Types.ObjectId.isValid(value),
      errorMessage: 'Invalid product ID'
    },
    notEmpty: {
      errorMessage: 'Product ID is required'
    }
  }
})

export const getSingleReviewsSchema = checkSchema({
  id: {
    in: ['params'],
    custom: {
      options: value => mongoose.Types.ObjectId.isValid(value),
      errorMessage: 'Invalid review ID'
    },
    notEmpty: {
      errorMessage: 'Product id must be provided'
    }
  }
})
