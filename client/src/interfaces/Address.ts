export default interface IAddress {
    id?: number,
    cep: string,
    street: string,
    complement?: string,
    neighborhood: string,
    city: string,
    uf: string,
    number: string
}