import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server)
      .post('/register-collaborator')
      .send({
        name: 'Matheus Henriques',
        register: '12345678900',
        medical_register: 'CRM/SP 123456',
        role: 'MEDICO_UTI',
        email: 'math.marqui@gmail.com',
        password: '12345678',
      })

    expect(response.statusCode).toEqual(201)
  })
})
