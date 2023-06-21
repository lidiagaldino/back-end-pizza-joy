import IClient from "../interfaces/Client";
import prisma from "../lib/db";

import bcrypt from 'bcryptjs'

class Client {
    async newClient(client: Omit<IClient, "id">): Promise<IClient | false> {

        try {
            const result = await prisma.cliente.create({
                data: {
                    email: client.email,
                    nome: client.nome,
                    senha: bcrypt.hashSync(client.senha, 8),
                    telefone: client.telefone,
                    cliente_endereco: {
                        create: {
                            endereco: {
                                create: {
                                    bairro: client.endereco.bairro,
                                    cep: client.endereco.cep,
                                    complemento: client.endereco.complemento,
                                    localidade: client.endereco.localidade,
                                    logradouro: client.endereco.logradouro,
                                    uf: client.endereco.uf
                                }
                            }
                        }
                    },
                },
                include: {
                    cliente_endereco: {
                        select: {
                            endereco: true
                        }
                    }
                }
            })

            const response: IClient = {
                id: result.id,
                email: result.email,
                nome: result.nome,
                senha: "",
                telefone: result.telefone,
                endereco: result.cliente_endereco[0].endereco
            }

            return response
        } catch (error) {
            return false
        }
    }

    async getById(id: number): Promise<IClient | false> {
        const client = await prisma.cliente.findUnique({
            where: { id },
            include: {
                cliente_endereco: {
                    select: {
                        endereco: true
                    }
                }
            }
        })

        if (client) {
            const response: IClient = {
                id: client.id,
                email: client.email,
                nome: client.nome,
                senha: "",
                telefone: client.telefone,
                endereco: client.cliente_endereco[0].endereco
            }

            return response
        } else {
            return false
        }
    }

    async updade(client: Omit<IClient, "id" | "endereco">, id: number) {

        try {
            const result = await prisma.cliente.update({
                where: {
                    id
                },
                data: {
                    email: client.email,
                    nome: client.nome,
                    senha: bcrypt.hashSync(client.senha, 8),
                    telefone: client.telefone
                },
            })


            result.senha = ""

            return result
        } catch (error) {
            return false
        }
    }

    async getByEmail(email: string) {
        const client = await prisma.cliente.findFirst({
            where: {
                email
            }
        })

        return client ? client : false
    }
}

export default new Client()