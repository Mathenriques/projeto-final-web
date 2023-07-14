import { CrmCorenFormatInvalidError } from '@/services/Errors/crm-coren-format-invalid-error'
import { CrmCorenUserAlreadyExistsError } from '@/services/Errors/crm-coren-user-already-exists-error'
import { EmailUserAlreadyExistsError } from '@/services/Errors/email-user-already-exists-error'
import { UserAlreadyExistsError } from '@/services/Errors/user-already-exists-error'
import { makeCollaboratorRegisterService } from '@/services/Factories/make-collaborator-register-service'
import { makeUserRegisterService } from '@/services/Factories/make-user-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterCollaborator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerCollaboratorBodySchema = z.object({
    name: z.string(),
    register: z.string(),
    medical_register: z.string(),
    role: z.enum(['MEDICO_UTI', 'MEDICO_GERAL', 'ENFERMEIRO']),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, register, medical_register, role, email, password } =
    registerCollaboratorBodySchema.parse(request.body)

  try {
    const registerUser = makeUserRegisterService()

    const { user } = await registerUser.execute({
      name,
      register,
    })

    const registerCollaborator = makeCollaboratorRegisterService()

    await registerCollaborator.execute({
      medical_register,
      role,
      email,
      password,
      user_id: user.id,
    })
  } catch (err) {
    if (
      err instanceof UserAlreadyExistsError ||
      err instanceof CrmCorenFormatInvalidError ||
      err instanceof CrmCorenUserAlreadyExistsError ||
      err instanceof EmailUserAlreadyExistsError
    ) {
      return reply.status(409).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
