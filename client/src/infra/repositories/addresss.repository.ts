import { CreateAddressRepository } from "../../application/repositories/address/create-address.repository";
import { DeleteAddressRepository } from "../../application/repositories/address/delete-address.repository";
import { FindByIdAddressRepository } from "../../application/repositories/address/find-address-by-id.repository";
import { SearchByClientAddressRepository } from "../../application/repositories/address/search-address-by-client.repository";
import { UpdateAddressRepository } from "../../application/repositories/address/update-address.repository";
import { CreateAddressInput, CreateAddressOutput } from "../../domain/usecases/address/create-address.usecase";
import { FindAddressByIdInput, FindAddressByIdOutput } from "../../domain/usecases/address/find-address-by-id.usecase";
import { SearchAddressByClientInput, SearchAddressByClientOutput } from "../../domain/usecases/address/search-address-by-client.usecase";
import { UpdateAddressInput, UpdateAddressOutput } from "../../domain/usecases/address/update-address.usecase";
import prisma from "../db/prisma";

export class AddressRepository implements
    CreateAddressRepository,
    UpdateAddressRepository,
    FindByIdAddressRepository,
    SearchByClientAddressRepository,
    DeleteAddressRepository {

    async delete(id: number): Promise<boolean> {
        await prisma.address.delete({
            where: { id }
        })

        return true
    }

    async search(id: SearchAddressByClientInput): Promise<SearchAddressByClientOutput> {
        const result = await prisma.cLientAddress.findMany({
            where: { client_Id: id.id },
            select: { address: true }
        })

        return result.map(item => item.address)
    }

    async find(id: FindAddressByIdInput): Promise<FindAddressByIdOutput> {
        const result = await prisma.address.findUnique({
            where: { id: id.id }
        })

        return result
    }

    async update(address: UpdateAddressInput, id: number): Promise<UpdateAddressOutput> {
        const result = await prisma.address.update({
            where: { id },
            data: address
        })

        return result
    }

    async insert(address: CreateAddressInput, id: number): Promise<CreateAddressOutput> {
        const result = await prisma.cLientAddress.create({
            data: {
                address: { create: address },
                client: { connect: { id } }
            },
            select: { address: true }
        })

        return result.address
    }

}