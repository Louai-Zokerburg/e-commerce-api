import { checkSchema } from 'express-validator'

export const createOrderSchema = checkSchema({
  'items.*.product': {
    in: ['body'],
    isMongoId: {
      errorMessage: 'Invalid product ID format'
    },
    notEmpty: {
      errorMessage: 'Product ID is required'
    }
  },
  'items.*.amount': {
    in: ['body'],
    isInt: {
      options: { min: 1 },
      errorMessage: 'Amount must be a positive integer'
    },
    notEmpty: {
      errorMessage: 'Amount is required'
    }
  },
  tax: {
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Tax must be a positive number'
    },
    notEmpty: {
      errorMessage: 'Tax is required'
    }
  },
  shippingFee: {
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Shipping fee must be a positive number'
    },
    notEmpty: {
      errorMessage: 'Shipping fee is required'
    }
  }
})

export const updateOrderSchema = checkSchema({
  paymentIntentId: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Payment Intent ID is required'
    }
  }
})
