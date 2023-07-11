import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ReproveCollaborator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCollaboratorBodySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteCollaboratorBodySchema.parse(request.body)

  const collab = await prisma.collaborator.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  })

  return reply.status(200).send({
    collaborators: collab,
  })
}
