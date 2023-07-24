import { CategoryEntity } from "../../../domain/entities/category.entity";
import { IngredientEntity } from "../../../domain/entities/ingredient.entity";
import { PizzaEntity } from "../../../domain/entities/pizza.entity";
import { SizeEntity, SizeProps } from "../../../domain/entities/size.entity";
import { CreatePizzaSizeInput, CreatePizzaSizeOutput, CreatePizzaSizeUseCase } from "../../../domain/usecases/pizza-size/create-pizza-size.usecase";
import { Validation } from "../../model/validate.model";
import { CreatePizzaSizeRepository } from "../../repositories/pizza-size/create-pizza-size.repository";
import { GetPizzaByIdRepository } from "../../repositories/pizza/get-pizza-by-id.repository";
import { FindSizeByIdRepository } from "../../repositories/size/find-size-by-id.repository";
import { FindSizeById } from "../size/find-size-by-id.service";

export class CreatePizzaSizeService implements CreatePizzaSizeUseCase {
    constructor(
        private readonly createPizzaSizeRepository: CreatePizzaSizeRepository,
        private readonly findPizzaByIdRepository: GetPizzaByIdRepository,
        private readonly findSizeByIdRepository: FindSizeByIdRepository,
        private readonly validation: Validation
    ) { }

    async create(data: CreatePizzaSizeInput, schema: any): Promise<CreatePizzaSizeOutput> {
        this.validation.validate(schema, data)

        const price = await this.calculatePrice(data.pizza_id, data.size_id)
        const result = await this.createPizzaSizeRepository.create({ ...data, price })

        return result
    }

    private async calculatePrice(id: number, new_size_id: number): Promise<number> {
        const pizza = await this.findPizzaByIdRepository.find(id)
        const size = await this.findSize(new_size_id)

        const createIngredients = pizza.ingredient.map(item => new IngredientEntity({ id: item.id, name: item.name, price: item.price }))
        const createSizes = [new SizeEntity(size)]
        const createCategory = new CategoryEntity({ id: pizza.category.id, name: pizza.category.name })

        const newPizza = new PizzaEntity({
            name: pizza.name,
            description: pizza.description,
            photo: pizza.photo,
            category: createCategory,
            ingredient: createIngredients,
            size: createSizes
        })

        const prices = newPizza.calculatePrices()

        return prices[0].price
    }

    private async findSize(id: number): Promise<SizeProps> {
        const result = await this.findSizeByIdRepository.find(id)

        return result
    }
}