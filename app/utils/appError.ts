import { APIGatewayProxyResult } from 'aws-lambda'

import { HttpCode } from '../types/response'
import type{ ValidationType } from '../types/response'

export default class BaseError extends Error {
  readonly status: number
  readonly code : string
  readonly message: string
  readonly validations?: ValidationType[] | null

  constructor (status: number, code: string, message: string, validations?: ValidationType[] | null) {
    super(message)

    this.status = status
    this.code = code
    this.message = message
    this.validations = validations

    Error.captureStackTrace(this, this.constructor)
  }

  getValues (): APIGatewayProxyResult {
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: ''
    }

    const body = {
      status: this.status,
      code: this.code,
      message: this.message,
      validations: this.validations,
    }

    response.body = JSON.stringify(body)
    return response
  }
}

export const AppError = (status = HttpCode.INTERNAL_SERVER_ERROR, code = 'internal_server_error', message = 'Internal server error', validations?: ValidationType[] | null): APIGatewayProxyResult => {
  return new BaseError(status, code, message, validations).getValues()
}
