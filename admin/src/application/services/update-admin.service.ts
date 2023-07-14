import { Admin } from "../../domain/entities/admin.entity";
import { UpdateAdminUseCase } from "../../domain/usecases/update-admin.use-case";
import { UpdateAdminInput, UpdateAdminOutput } from "../models/admin.model";
import { Verify } from "../models/criptography.model";
import { Validation } from "../models/validate.model";
import { CheckAccountEmailRepository } from "../repositories/check-account-email.repository";
import { UpdateAdminRepository } from "../repositories/update-admin.repository";

export class UpdateAdmin implements UpdateAdminUseCase {
    constructor(private readonly updateAdminRepository: UpdateAdminRepository, private readonly validation: Validation) { }

    async update(admin: UpdateAdminInput, id: number, schema: any): Promise<UpdateAdminOutput> {
        this.validation.validate(schema, admin)
        const result = await this.updateAdminRepository.update(id, admin)

        return result
    }


}