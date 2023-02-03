import { PrismaClient } from '@prisma/client'
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

import { HttpCode } from '../types/response'
import { AppError, AppSuccess } from '../utils'

const prisma = new PrismaClient()

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true }
    })

    return AppSuccess(HttpCode.OK, 'success', 'List Users', users)
  } catch (err) {
    console.error({ err })
    return AppError(HttpCode.INTERNAL_SERVER_ERROR, 'internal_server_error', 'Internal server error', err)
  }
}
