import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetAllCollaboratorsToApprove(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const collabs = await prisma.collaborator.findMany({
    where: {
      approved: false,
    },
    select: {
      id: true,
      medical_register: true,
      function: true,
      email: true,
      user: {
        select: {
          name: true,
          register: true,
        },
      },
    },
  })

  return reply.status(200).send({
    collaborators: collabs,
  })
}
