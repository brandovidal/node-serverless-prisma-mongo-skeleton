import { APIGatewayProxyResult } from 'aws-lambda'

import { HttpCode } from '../types/response'

export default class BaseSuccess {
  status: number
  code : string
  message: string

  data: string | object | null = null
  count?: number | undefined
  total?: number | undefined

  constructor (status: number, code: string, message: string, data: object | string | null, count?: number, total?: number) {
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
      message: this.message,
      data: this.data,
      count: this.count,
      total: this.total,
    }

    response.body = JSON.stringify(body)
    return response
  }
}

export const AppSuccess = (status = HttpCode.OK, code = '', message = 'error', data: object | string | null = null, count = 0, total = 0): APIGatewayProxyResult => {
  return new BaseSuccess(status, code, message, data, count, total).getValues()
}
