import { Prisma, PrismaClient } from '@prisma/client'
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { HttpCode } from '../types/response'
import { AppError, AppSuccess } from '../utils'

const prisma = new PrismaClient()

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  try {
    const body = event.body

    if (body === null) {
      return AppError(HttpCode.BAD_REQUEST, 'error', 'No body')
    }

    const data = JSON.parse(body) as Prisma.UserCreateInput
    const createdUser = await prisma.user.create({ data })

    return AppSuccess(HttpCode.CREATED, 'success', 'User created', createdUser)
  } catch (err) {
    console.error(err)

    if (err instanceof Prisma.PrismaClientValidationError) {
      return AppError(HttpCode.BAD_REQUEST, 'error', 'Validation error with missing parameters')
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return AppError(HttpCode.BAD_REQUEST, 'error', 'User already exists')
      }
    }
    return AppError(HttpCode.INTERNAL_SERVER_ERROR, 'internal_server_error', 'Internal server error', err)
  }
}
