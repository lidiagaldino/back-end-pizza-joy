export default interface IPayload {
    id: number,
    modo: 'ADMIN' | 'CLIENT' | 'DELIVERYMAN',
    id_modo: number
}