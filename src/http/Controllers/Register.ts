import { FastifyReply, FastifyRequest } from 'fastify'

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(201).send()
}
