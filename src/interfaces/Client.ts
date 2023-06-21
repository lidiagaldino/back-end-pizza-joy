import IAddress from "./Address";

export default interface IClient {
    id: number,
    nome: string,
    telefone: string,
    email: string,
    senha: string,
    endereco: IAddress
}