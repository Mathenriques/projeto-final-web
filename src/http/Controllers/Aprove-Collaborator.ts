import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AproveCollaborator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const approveCollaboratorBodySchema = z.object({
    id: z.string(),
  })

  const { id } = approveCollaboratorBodySchema.parse(request.body)

  const collab = await prisma.collaborator.update({
    data: {
      approved: true,
    },
    where: {
      id,
    },
  })

  return reply.status(200).send({
    collaborators: collab,
  })
}
