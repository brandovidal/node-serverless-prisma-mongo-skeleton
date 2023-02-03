import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  const db = process.env.DATABASE_URL || 'Hello World!'

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: true,
      code: 'success',
      data: { message: 'Using Serverless and Prisma', db }
    })
  }
}
