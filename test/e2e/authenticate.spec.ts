import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    await request(app.server).post('/register-collaborator').send({
      name: 'Jhon Doe',
      register: '12345678900',
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_UTI',
      email: 'jhondoe@example.com',
      password: '12345678',
    })
    const response = await request(app.server).post('/authenticate').send({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_UTI',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
