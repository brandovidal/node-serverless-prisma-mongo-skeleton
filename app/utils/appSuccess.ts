import { APIGatewayProxyResult } from 'aws-lambda'
import isEmpty from 'just-is-empty'

import { HttpCode } from '../types/response'

export default class BaseSuccess {
  readonly status: number
  readonly code : string
  readonly message: string

  readonly data: string | object | null | undefined
  readonly count?: number | undefined
  readonly total?: number | undefined

  constructor (status: number, code: string, message: string, data?: object | string | null, count?: number, total?: number) {
    this.status = status
    this.code = code
    this.message = message
    this.data = data
    this.count = count
    this.total = total
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
    }

    if (!isEmpty(this.data)) {
      body['data'] = this.data
    }
    if (!isEmpty(this.count)) {
      body['count'] = this.count
    }
    if (!isEmpty(this.total)) {
      body['total'] = this.total
    }

    response.body = JSON.stringify(body)
    return response
  }
}

export const AppSuccess = (status = HttpCode.OK, code = '', message = 'error', data: object | string | null = null, count = 0, total = 0): APIGatewayProxyResult => {
  return new BaseSuccess(status, code, message, data, count, total).getValues()
}
