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
