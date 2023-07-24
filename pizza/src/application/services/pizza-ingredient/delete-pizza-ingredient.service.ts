import { DeletePizzaIngredientInput, DeletePizzaIngredientUseCase } from "../../../domain/usecases/pizza-ingredient/delete-pizza-ingredient.usecase";
import { Validation } from "../../model/validate.model";
import { FindIngredientByIdRepository } from "../../repositories/ingredient/find-ingredient-by-id.repository";
import { DeletePizzaIngredientRepository } from "../../repositories/pizza-ingredient/delete-pizza-ingredient.repository";
import { UpdatePizzasPriceIngredientRepository } from "../../repositories/pizza/update-pizza-price-ingredient.repository";
import { updatePizzaPriceRepository } from "../../repositories/pizza/update-pizza-price.repository";

export class DeletePizzaIngredient implements DeletePizzaIngredientUseCase {
    constructor(
        private readonly deletePizzaIngredientRepository: DeletePizzaIngredientRepository,
        private readonly findIngredientByIdRepository: FindIngredientByIdRepository,
        private readonly updatePizzaRepository: updatePizzaPriceRepository,
        private readonly validation: Validation
    ) { }

    async delete(data: DeletePizzaIngredientInput, schema: any): Promise<boolean> {
        console.log('oii');
        this.validation.validate(schema, data)
        const ingredient = await this.findIngredientByIdRepository.find(data.ingredient_id)
        console.log(ingredient);
        if (!ingredient) throw new Error('INGREDIENT_NOT_FOUND')

        this.deletePizzaIngredientRepository.delete(data)
        await this.updatePizzaPrice(ingredient.price * -1, data.pizza_id)

        return true
    }

    private async updatePizzaPrice(diferency: number, id: number): Promise<boolean> {
        await this.updatePizzaRepository.updatePizzaPrice({ id, diferency })

        return true
    }
}