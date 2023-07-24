import { IngredientProps } from "../../../domain/entities/ingredient.entity";
import { UpdateIngredientInput, UpdateIngredientUseCase } from "../../../domain/usecases/ingredient/update-ingredient.usecase";
import { Validation } from "../../model/validate.model";
import { FindIngredientByIdRepository } from "../../repositories/ingredient/find-ingredient-by-id.repository";
import { UpdateIngredientRepository } from "../../repositories/ingredient/update-ingredient.repository";
import { FindPizzaByIngredientRepository } from "../../repositories/pizza-ingredient/find-pizza-by-ingredient.repository";
import { UpdatePizzasPriceIngredientRepository } from "../../repositories/pizza/update-pizza-price-ingredient.repository";
import { UpdatePizzasPriceRepository } from "../../repositories/pizza/update-pizza-price-size.repository";

export class UpdateIngredient implements UpdateIngredientUseCase {
    constructor(
        private readonly updateIngredientRepository: UpdateIngredientRepository,
        private readonly findIngredientByIdRepository: FindIngredientByIdRepository,
        private readonly findPizzaByIngredient: FindPizzaByIngredientRepository,
        private readonly updatePizzaPrice: UpdatePizzasPriceIngredientRepository,
        private readonly validation: Validation,
    ) { }

    async update(ingredient: UpdateIngredientInput, id: number, schema: any): Promise<IngredientProps> {
        this.validation.validate(schema, ingredient)

        const verifyIfExists = await this.findIngredientByIdRepository.find(id)
        if (!verifyIfExists) throw new Error('INGREDIENT_NOT_FOUND')

        const result = await this.updateIngredientRepository.update(ingredient, id)
        this.updatePizzaPrices((verifyIfExists.price - result.price), result.id)
        return result
    }

    private async updatePizzaPrices(diferency: number, ingredient: number): Promise<boolean> {
        const pizzas = this.findPizzaByIngredient.findByIngredient(ingredient)
        if (!pizzas) return true

        console.log(diferency);
        await this.updatePizzaPrice.updatePriceIngredient({ id: ingredient, diferency })

        return true
    }
}