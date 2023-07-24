import IAddress from "../interfaces/Address";
import prisma from "../infra/db/prisma";

class Address {
    async newAddress(address: Omit<IAddress, "id">, id: number): Promise<IAddress | false> {
        try {
            const result = await prisma.cLientAddress.create({
                data: {
                    address: {
                        create: address
                    },
                    client: {
                        connect: {
                            id
                        }
                    }
                },
                select: {
                    address: true
                }
            })

            return result.address as IAddress
        } catch (error) {
            return false
        }
    }

    async updateAddress(address: Omit<IAddress, "id">, id: number): Promise<IAddress | false> {
        try {
            const result = await prisma.address.update({
                where: {
                    id
                },
                data: address
            })

            return result as IAddress
        } catch (error) {
            return false
        }
    }

    async getMyadresses(client_id: number): Promise<IAddress[] | false> {
        const result = await prisma.address.findMany({
            where: {
                client_address: {
                    every: {
                        client_Id: client_id
                    }
                }
            }
        })

        return result.length > 0 ? result : false
    }

    async getAddressById(id: number): Promise<IAddress | false> {
        const address = await prisma.address.findUnique({
            where: {
                id
            }
        })

        return address ? address : false
    }
}

export default new Address()