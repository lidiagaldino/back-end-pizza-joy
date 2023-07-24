import { reach } from "yup";
import { CreatePizzaIngredientInput, CreatePizzaIngredientOutput, CreatePizzaIngredientUseCase } from "../../../domain/usecases/pizza-ingredient/create-pizza-ingredient.usecase";
import { Validation } from "../../model/validate.model";
import { CreatePizzaIngredientRepository } from "../../repositories/pizza-ingredient/create-pizza-ingredient.repository";
import { CreatePizzaRepository } from "../../repositories/pizza/create-pizza.repository";
import { FindIngredientByIdRepository } from "../../repositories/ingredient/find-ingredient-by-id.repository";
import { UpdatePizzasPriceIngredientRepository } from "../../repositories/pizza/update-pizza-price-ingredient.repository";
import { updatePizzaPriceRepository } from "../../repositories/pizza/update-pizza-price.repository";

export class CreatePizzaIngredient implements CreatePizzaIngredientUseCase {
    constructor(
        private readonly createPizzaIngredientRepository: CreatePizzaIngredientRepository,
        private readonly findIngredientByIdRepository: FindIngredientByIdRepository,
        private readonly updatePizzaPriceRepository: updatePizzaPriceRepository,
        private readonly validation: Validation
    ) { }

    async create(data: CreatePizzaIngredientInput, schema: any): Promise<CreatePizzaIngredientOutput> {
        this.validation.validate(schema, data)
        console.log(data);
        const ingredient = await this.findIngredientByIdRepository.find(data.ingredient_id)
        console.log(ingredient);
        if (!ingredient) throw new Error('INGREDIENT_NOT_FOUND')

        const result = await this.createPizzaIngredientRepository.create(data)
        await this.updatePizzaPrice(ingredient.price, data.pizza_id)

        return result
    }

    private async updatePizzaPrice(diferency: number, id: number): Promise<boolean> {
        await this.updatePizzaPriceRepository.updatePizzaPrice({ id, diferency })

        return true
    }
}