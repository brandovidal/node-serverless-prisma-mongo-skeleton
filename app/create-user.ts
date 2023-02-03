import { Prisma, PrismaClient } from '@prisma/client'
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

const prisma = new PrismaClient()

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  try {
    const body = event.body

    if (body === null) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 400,
          code: 'error',
          data: { message: 'No body' }
        })
      }
    }

    const data = JSON.parse(body) as Prisma.UserCreateInput
    const createdUser = await prisma.user.create({ data })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 200,
        code: 'success',
        data: createdUser
      })
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 500,
        code: 'error',
        data: error
      })
    }
  }
}
