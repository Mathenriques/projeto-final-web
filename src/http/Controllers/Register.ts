import { CrmCorenFormatInvalidError } from '@/services/Errors/crm-coren-format-invalid-error'
import { CrmCorenUserAlreadyExistsError } from '@/services/Errors/crm-coren-user-already-exists-error'
import { EmailUserAlreadyExistsError } from '@/services/Errors/email-user-already-exists-error'
import { makeRegisterService } from '@/services/Factories/make-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['MEDICO_UTI', 'MEDICO_GERAL', 'ENFERMEIRO']),
    crmCoren: z.string(),
  })

  const { name, email, password, role, crmCoren } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      email,
      password,
      role,
      crmCoren,
    })
  } catch (err) {
    if (
      err instanceof EmailUserAlreadyExistsError ||
      err instanceof CrmCorenFormatInvalidError ||
      err instanceof CrmCorenUserAlreadyExistsError
    ) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
