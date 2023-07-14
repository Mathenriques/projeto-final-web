import { CollaboratorDoesNotExists } from '@/services/Errors/collaborator-does-not-exists-error'
import { SolicitationDoesNotExists } from '@/services/Errors/solicitation-does-not-exists-error'
import { UserAlreadyExistsError } from '@/services/Errors/user-already-exists-error'
import { makePatientInfosRegisterService } from '@/services/Factories/make-patient-infos-register-service'
import { makePatientRegisterService } from '@/services/Factories/make-patient-register-service'
import { makeSolicitationRegisterService } from '@/services/Factories/make-solicitation-register-service'
import { makeUserRegisterService } from '@/services/Factories/make-user-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterPatient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPatientBodySchema = z.object({
    name: z.string(),
    register: z.string(),
    birth_date: z.string(),
    gender: z.enum(['Masculino', 'Feminino']),
    main_deseases: z.string().array(),
    precaution: z.enum([
      'Padrao',
      'Contato',
      'Respiratorio_Goticula',
      'Respiratory_Aerossol',
    ]),
    antecedents_comorbidities: z.string().array(),
    suport_needed: z.string().array(),
    priority: z.number(),
    collaborator_id: z.string(),
  })

  const {
    name,
    register,
    birth_date,
    gender,
    antecedents_comorbidities,
    main_deseases,
    precaution,
    priority,
    suport_needed,
    collaborator_id,
  } = registerPatientBodySchema.parse(request.body)

  try {
    const registerUser = makeUserRegisterService()

    const { user } = await registerUser.execute({
      name,
      register,
    })

    const registerPatient = makePatientRegisterService()

    const { patient } = await registerPatient.execute({
      birth_date,
      gender,
      user_id: user.id,
    })

    const solicit = makeSolicitationRegisterService()

    const { solicitation } = await solicit.execute({
      collaborator_id,
      priority,
      status: 'Pendente',
    })

    const registerPatientInfo = makePatientInfosRegisterService()

    await registerPatientInfo.execute({
      main_deseases,
      precaution,
      antecedents_comorbidities,
      suport_needed,
      patient_id: patient.id,
      solicitation_id: solicitation.id,
    })
  } catch (err) {
    if (
      err instanceof UserAlreadyExistsError ||
      err instanceof CollaboratorDoesNotExists ||
      err instanceof SolicitationDoesNotExists
    ) {
      return reply.status(409).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
