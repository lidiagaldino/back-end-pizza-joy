import { DeletePizzaSizeInput, DeletePizzaSizeUseCase } from "../../../domain/usecases/pizza-size/delete-pizza-size.usecase";
import { Validation } from "../../model/validate.model";
import { DeletePizzaSizeRepository } from "../../repositories/pizza-size/delete-pizza-ingredient.repository";

export class DeletePizzaSize implements DeletePizzaSizeUseCase {
    constructor(
        private readonly deletePizzaSizeRepository: DeletePizzaSizeRepository,
        private readonly validation: Validation
    ) { }

    async delete(data: DeletePizzaSizeInput, schema: any): Promise<boolean> {
        this.validation.validate(schema, data)

        this.deletePizzaSizeRepository.delete(data)

        return true
    }
} 