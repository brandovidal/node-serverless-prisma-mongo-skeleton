import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

import { AppSuccess } from '../utils'
import { HttpCode } from '../types/response'

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  return AppSuccess(HttpCode.OK, 'success', 'Using Serverless and Prisma')
}
