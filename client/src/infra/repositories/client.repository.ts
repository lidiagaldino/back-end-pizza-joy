import { CreateInput, CreateOutput, GetByEmailInput, GetByEmailOutput, GetByIdInput, GetByIdOutput } from "../../application/models/client.model";
import { CreateClientRepository } from "../../application/repositories/client/create-client.repository";
import { GetClientByEmailRepository } from "../../application/repositories/client/get-client-email.repository";
import { GetClientByIdRepository } from "../../application/repositories/client/get-client-id.repository";
import { UpdateClientRepository } from "../../application/repositories/client/update-client.repository";
import { UpdateClientInput, UpdateClientOutput } from "../../domain/usecases/client/update-client.usecase";
import prisma from "../db/prisma";
import KafkaSendMessage from "../kafka/KafkaSendMessage";

export class ClientRepository implements
    CreateClientRepository,
    GetClientByEmailRepository,
    UpdateClientRepository,
    GetClientByIdRepository {
    async update(client: UpdateClientInput, id: number): Promise<UpdateClientOutput> {
        const result = await prisma.client.update({
            where: { id },
            data: client
        })

        result.password = ""

        return result
    }

    async search(client: GetByIdInput): Promise<GetByIdOutput> {
        const result = await prisma.client.findUnique({
            where: { id: Number(client.id) }
        })

        result.password = ""

        return result
    }

    async find(client: GetByEmailInput): Promise<GetByEmailOutput> {
        const result = await prisma.client.findFirst({
            where: { email: client.email }
        })

        return result
    }

    async insert(client: CreateInput): Promise<CreateOutput> {
        const result = await prisma.client.create({
            data: client
        })

        await KafkaSendMessage.execute('new-client', { external_id: result.id, name: result.name, phone: result.phone })

        result.password = ""

        return result
    }

}