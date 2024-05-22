import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecovery(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Request Password Recovery',
        body: z.object({
          email: z.string().email(),
        }),
        response: { 201: z.null() },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) return reply.status(201).send()

      const { id } = await prisma.token.create({
        data: { type: 'PASSWORD_RECOVER', userId: userFromEmail.id },
      })

      // Send e-mail using provider

      console.log('Recover Password Token: ', id)

      return reply.status(201).send()
    },
  )
}
