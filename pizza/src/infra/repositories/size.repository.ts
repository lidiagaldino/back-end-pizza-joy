import { FindByIdOutput } from "../../application/model/size.model";
import { CreateSizeRepository } from "../../application/repositories/size/create-size.repository";
import { DeleteSizeRepository } from "../../application/repositories/size/delete-size.repository";
import { FindSizeByIdRepository } from "../../application/repositories/size/find-size-by-id.repository";
import { GetAllSizesRepository } from "../../application/repositories/size/get-all-sizes.repository";
import { UpdateSizeRepository } from "../../application/repositories/size/update-size.repository";
import { SizeProps } from "../../domain/entities/size.entity";
import { CreateSizeInput } from "../../domain/usecases/size/create-size.usecase";
import { GetAllSizesOutput } from "../../domain/usecases/size/get-all-sizes.usecase";
import { UpdateSizeInput } from "../../domain/usecases/size/update-size.usecase";
import prisma from "../db/prisma";

export class SizeRepository implements
    FindSizeByIdRepository,
    DeleteSizeRepository,
    CreateSizeRepository,
    GetAllSizesRepository,
    UpdateSizeRepository {

    async create(size: CreateSizeInput): Promise<SizeProps> {
        const result = await prisma.size.create({
            data: size
        })

        return result
    }

    async delete(id: number): Promise<boolean> {
        await prisma.size.delete({
            where: { id }
        })

        return true
    }

    async index(): Promise<GetAllSizesOutput> {
        const result = await prisma.size.findMany()

        return result
    }

    async update(size: UpdateSizeInput, id: number): Promise<SizeProps> {
        const result = await prisma.size.update({
            where: { id },
            data: size
        })

        return result
    }

    async find(id: number): Promise<FindByIdOutput> {
        const result = await prisma.size.findUnique({
            where: { id }
        })

        return result
    }

}