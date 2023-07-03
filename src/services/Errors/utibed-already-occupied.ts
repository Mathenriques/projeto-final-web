export class UtiBedAlreadyOccupied extends Error {
    constructor() {
        super('Uti Bed already occupied.')
    }
}