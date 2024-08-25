import { StatusCodes } from 'http-status-codes'

export class CustomAPIError extends Error {
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
}

export class BadRequestError extends CustomAPIError {
  statusCode: StatusCodes

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
export class UnauthenticatedError extends CustomAPIError {
  statusCode: StatusCodes

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export class UnauthorizedError extends CustomAPIError {
  statusCode: StatusCodes

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export class NotFoundError extends CustomAPIError {
  statusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export class ValidationError extends CustomAPIError {
  statusCode: StatusCodes
  errorMessages: { message: string }[]

  constructor(errorMessages: { message: string }[]) {
    super()
    this.statusCode = StatusCodes.BAD_REQUEST
    this.errorMessages = errorMessages
  }
}
