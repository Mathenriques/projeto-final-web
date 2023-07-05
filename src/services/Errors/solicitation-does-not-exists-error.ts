export class SolicitationDoesNotExists extends Error {
  constructor() {
    super('Solicitation does not exists.')
  }
}
