import { CrmCorenFormatInvalidError } from '@/services/Errors/crm-coren-format-invalid-error'
import { CrmCorenUserAlreadyExistsError } from '@/services/Errors/crm-coren-user-already-exists-error'
import { EmailUserAlreadyExistsError } from '@/services/Errors/email-user-already-exists-error'
import { UserAlreadyExistsError } from '@/services/Errors/user-already-exists-error'
import { makeCollaboratorApproveService } from '@/services/Factories/make-collaborator-approve-service'
import { makeCollaboratorRegisterService } from '@/services/Factories/make-collaborator-register-service'
import { makeUserRegisterService } from '@/services/Factories/make-user-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function RegisterAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerUser = makeUserRegisterService()

    const { user } = await registerUser.execute({
      name: 'Administrador',
      register: '99999999999',
    })

    const registerCollaborator = makeCollaboratorRegisterService()

    await registerCollaborator.execute({
      medical_register: 'CRM/BR 999999',
      role: 'MEDICO_UTI',
      email: 'admin@email.com',
      password: '12345678',
      user_id: user.id,
    })

    const approveCollaborator = makeCollaboratorApproveService()
    await approveCollaborator.execute({
      medical_register: 'CRM/BR 999999',
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
