import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      status: true, 
      data: event.body, 
      method: event.requestContext.httpMethod,
      path: event.path, 
      headers: event.headers, 
      query: event.queryStringParameters
    }),
  };
}
