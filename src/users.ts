import { PrismaClient } from "@prisma/client";
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const prisma = new PrismaClient()

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  const method = event.requestContext['http']['method'] ?? 'GET'
  const query = event.queryStringParameters ?? {}

  try {

    const users = await prisma.user.findMany({
      include: { profile: true }
    })
  
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 200,
        method,
        query,
        data: users
      }),
    };
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 500,
        method,
        query,
        data: error
      }),
    }
  }
}
