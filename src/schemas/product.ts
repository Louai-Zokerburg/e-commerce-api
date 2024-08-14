import { checkSchema } from 'express-validator'

export const productValidationSchema = checkSchema({
  name: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Name must be provided'
    },
    isLength: {
      options: { max: 100 },
      errorMessage: 'Name must be 100 characters or less'
    }
  },
  price: {
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Price must be a valid number'
    },
    notEmpty: {
      errorMessage: 'Price must be provided'
    },
    toFloat: true
  },
  description: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Description must be provided'
    },
    isLength: {
      options: { max: 1000 },
      errorMessage: 'Description must be 1000 characters or less'
    }
  },
  image: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Image must be a valid string'
    }
  },
  category: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Category must be provided'
    },
    isIn: {
      options: [['office', 'kitchen', 'bedroom']],
      errorMessage: 'Category must be either office, kitchen, or bedroom'
    }
  },
  company: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Company must be provided'
    },
    isIn: {
      options: [['ikea', 'liddy', 'marcos']],
      errorMessage: 'Company must be either ikea, liddy, or marcos'
    }
  },
  colors: {
    in: ['body'],
    isArray: {
      errorMessage: 'Colors must be an array of strings'
    },
    notEmpty: {
      errorMessage: 'Colors must be provided'
    }
  },
  featured: {
    in: ['body'],
    optional: true,
    isBoolean: {
      errorMessage: 'Featured must be true or false'
    },
    toBoolean: true
  },
  freeShipping: {
    in: ['body'],
    optional: true,
    isBoolean: {
      errorMessage: 'FreeShipping must be true or false'
    },
    toBoolean: true
  },
  inventory: {
    in: ['body'],
    isInt: {
      options: { min: 0 },
      errorMessage: 'Inventory must be a non-negative integer'
    },
    notEmpty: {
      errorMessage: 'Inventory must be provided'
    },
    toInt: true
  },
  averageRating: {
    in: ['body'],
    optional: true,
    isFloat: {
      options: { min: 0, max: 5 },
      errorMessage: 'Average rating must be between 0 and 5'
    },
    toFloat: true
  },
  numOfReviews: {
    in: ['body'],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: 'Number of reviews must be a non-negative integer'
    },
    toInt: true
  }
})
