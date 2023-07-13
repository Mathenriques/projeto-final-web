import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'MEDICO_UTI' | 'MEDICO_GERAL' | 'ENFERMEIRO'
      sub: string
    } // user type is return type of `request.user` object
  }
}
