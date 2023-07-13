import { CollaboratorDoesNotExists } from '@/services/Errors/collaborator-does-not-exists-error'
import { CrmCorenFormatInvalidError } from '@/services/Errors/crm-coren-format-invalid-error'
import { makeCollaboratorAuthenticateService } from '@/services/Factories/make-collaborator-authenticate-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateCollaborator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerCollaboratorBodySchema = z.object({
    medical_register: z.string(),
    password: z.string().min(8),
    role: z.enum(['MEDICO_UTI', 'MEDICO_GERAL', 'ENFERMEIRO']),
  })

  const { medical_register, password, role } =
    registerCollaboratorBodySchema.parse(request.body)

  try {
    const AuthenticateCollaborator = makeCollaboratorAuthenticateService()

    const { collaborator } = await AuthenticateCollaborator.execute({
      medical_register,
      password,
      role,
    })

    const token = await reply.jwtSign(
      {
        role: collaborator.function,
      },
      {
        sign: {
          sub: collaborator.id,
        },
      },
    )

    return reply.status(201).send({
      token,
    })
  } catch (err) {
    if (
      err instanceof CollaboratorDoesNotExists ||
      err instanceof CrmCorenFormatInvalidError
    ) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
