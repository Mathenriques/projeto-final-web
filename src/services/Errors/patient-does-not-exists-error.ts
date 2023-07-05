export class PatientDoesNotExists extends Error {
  constructor() {
    super('Patient does not exists.')
  }
}
