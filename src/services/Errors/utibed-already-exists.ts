export class UtiBedAlreadyExistsError extends Error {
    constructor() {
        super('Uti Bed already exists.')
    }
}