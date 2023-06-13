export class EmailUserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
