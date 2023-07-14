import { Admin } from "../../domain/entities/admin.entity";
import { CreateAdminInput, CreateAdminOutput, CreateAdminUseCase } from "../../domain/usecases/create-admin.use-case";
import { AdminDataOutput, AdminDataUseCase } from "../../domain/usecases/get-admin-data.use-case";
import { GetAdminDataRepository } from "../repositories/admin-data.repository";
import { IAdminRepository } from "../repositories/create-admin.repository";

export class GetAdminData implements AdminDataUseCase {
    constructor(private readonly adminDataRepository: GetAdminDataRepository) { }

    async getById(id: number): Promise<AdminDataOutput> {
        const result = await this.adminDataRepository.get(id)

        return result
    }

}