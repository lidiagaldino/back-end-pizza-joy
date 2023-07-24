import IClient from "../interfaces/Client";
import KafkaSendMessage from "../infra/kafka/KafkaSendMessage";
import prisma from "../infra/db/prisma";

import bcrypt from 'bcryptjs'

class Client {
    async newClient(client: Omit<IClient, "id">): Promise<IClient | false> {

        try {
            const result = await prisma.client.create({
                data: {
                    email: client.email,
                    name: client.name,
                    password: bcrypt.hashSync(client.password, 8),
                    phone: client.phone,
                    client_address: {
                        create: {
                            address: {
                                create: {
                                    neighborhood: client.address.neighborhood,
                                    cep: client.address.cep,
                                    complement: client.address.complement,
                                    city: client.address.city,
                                    street: client.address.street,
                                    uf: client.address.uf,
                                    number: client.address.number,
                                    lat: client.address.lat,
                                    lng: client.address.lng
                                }
                            }
                        }
                    },
                },
                include: {
                    client_address: {
                        select: {
                            address: true
                        }
                    }
                }
            })

            const response: IClient = {
                id: result.id,
                email: result.email,
                name: result.name,
                password: "",
                phone: result.phone,
                address: result.client_address[0].address
            }

            await KafkaSendMessage.execute('new-client', { external_id: response.id, name: response.name, phone: response.phone })

            return response
        } catch (error) {
            return false
        }
    }

    async getById(id: number): Promise<IClient | false> {
        const client = await prisma.client.findUnique({
            where: { id },
            include: {
                client_address: {
                    select: {
                        address: true
                    }
                }
            }
        })

        if (client) {
            const response: IClient = {
                id: client.id,
                email: client.email,
                name: client.name,
                password: "",
                phone: client.phone,
                address: client.client_address[0].address
            }

            return response
        } else {
            return false
        }
    }

    async updade(client: Omit<IClient, "id" | "endereco">, id: number) {

        try {
            const result = await prisma.client.update({
                where: {
                    id
                },
                data: {
                    email: client.email,
                    name: client.name,
                    password: bcrypt.hashSync(client.password, 8),
                    phone: client.phone
                },
            })


            result.password = ""

            await KafkaSendMessage.execute('update-client', { external_id: result.id, phone: result.phone, name: result.name })

            return result
        } catch (error) {
            return false
        }
    }

    async getByEmail(email: string) {
        const client = await prisma.client.findFirst({
            where: {
                email
            }
        })

        return client ? client : false
    }
}

export default new Client()