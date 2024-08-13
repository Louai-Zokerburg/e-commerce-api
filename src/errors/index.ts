import { StatusCodes } from 'http-status-codes'

export class CustomAPIError extends Error {}

export class BadRequestError extends CustomAPIError {
	statusCode: StatusCodes

	constructor(message: string) {
		super(message)
		this.statusCode = StatusCodes.BAD_REQUEST
	}
}
