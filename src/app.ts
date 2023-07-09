import fastify from 'fastify'
import { AppMainRoutes } from './http/routes/main-Routes'
import { AppJwtRoutes } from './http/routes/jwt-routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
})

app.register(AppMainRoutes)
app.register(AppJwtRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ mesage: 'Validatin error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
