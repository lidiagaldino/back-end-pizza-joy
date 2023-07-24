import { SizeProps } from "../../../domain/entities/size.entity";
import { CreateSizeInput, CreateSizeUseCase } from "../../../domain/usecases/size/create-size.usecase";
import { Validation } from "../../model/validate.model";
import { CreateSizeRepository } from "../../repositories/size/create-size.repository";

export class CreateSize implements CreateSizeUseCase {
    constructor(
        private readonly createSizeRepository: CreateSizeRepository,
        private readonly validation: Validation
    ) { }

    async create(size: CreateSizeInput, schema: any): Promise<SizeProps> {
        this.validation.validate(schema, size)

        const result = await this.createSizeRepository.create(size)
        return result
    }
}