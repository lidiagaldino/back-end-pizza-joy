import { Admin } from "../../domain/entities/admin.entity";
import { CreateAdminInput, CreateAdminOutput, CreateAdminUseCase } from "../../domain/usecases/create-admin.use-case";
import { Validation } from "../models/validate.model";
import { IAdminRepository } from "../repositories/create-admin.repository";

export class CreateAdmin implements CreateAdminUseCase {
    constructor(private readonly createAdminRepository: IAdminRepository, private readonly validation: Validation) { }

    async create(data: CreateAdminInput, schema: any): Promise<CreateAdminOutput> {
        new Admin(data)
        this.validation.validate(schema, data)

        const acc = await this.createAdminRepository.verifyIfExists(data)
        if (acc) throw new Error('email has already been taken')

        return await this.createAdminRepository.insert(data)
    }
}