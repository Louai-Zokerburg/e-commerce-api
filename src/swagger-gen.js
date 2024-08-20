const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './routers/auth.ts',
  './routers/user.ts',
  './routers/order.ts',
  './routers/review.ts',
  './routers/product.ts'
]

swaggerAutogen(outputFile, endpointsFiles)
