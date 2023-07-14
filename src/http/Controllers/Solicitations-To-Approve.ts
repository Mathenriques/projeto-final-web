import { makeGetAllSolicitationToApproveService } from '@/services/Factories/make-get-all-solicitations-to-approve-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function SolicitationsToApprove(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllSolicitationsToApproveService =
    makeGetAllSolicitationToApproveService()

  const { solicitations } = await getAllSolicitationsToApproveService.execute()

  return reply.status(200).send({
    solicitations,
  })
}
