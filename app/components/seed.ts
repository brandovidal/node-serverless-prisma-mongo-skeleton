const { PrismaClient } = require('@prisma/client')
import { Prisma } from '@prisma/client'
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

import { HttpCode } from '../types/response'
import { AppError, AppSuccess } from '../utils'

const prisma = new PrismaClient()

export async function handler(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
  try {
    await Promise.all([prisma.profile.deleteMany(), prisma.post.deleteMany()])
    await prisma.user.deleteMany()

    const createdUser = await prisma.user.create({
      data: seedUser,
    })

    return AppSuccess(HttpCode.CREATED, 'success', 'Seed Users', createdUser)
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

const seedUser: Prisma.UserCreateInput = {
  email: 'jane@prisma.io',
  name: 'Jane',
  username: 'jane',
  password: 'admin123',
  profile: {
    create: {
      bio: 'Health Enthusiast',
    },
  },
  posts: {
    create: [
      {
        title: 'Comparing Database Types: How Database Types Evolved to Meet Different Needs',
        content: 'https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37/',
      },
      {
        title: 'Analysing Sleep Patterns: The Quantified Self',
        content: 'https://quantifiedself.com/get-started/',
      },
      {
        title: 'Prisma 2 Docs',
        content: 'https://www.prisma.io/docs/',
      },
    ],
  },
}
