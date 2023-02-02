import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  const message = process.env.MESSAGE || 'Hello World!'
  const dbUrl = process.env.DATABASE_URL || 'Database!'

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: true,
      data: { message, dbUrl }
    })
  }
}
