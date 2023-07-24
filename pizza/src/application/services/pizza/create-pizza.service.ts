import { CategoryEntity } from "../../../domain/entities/category.entity";
import { IngredientEntity } from "../../../domain/entities/ingredient.entity";
import { PizzaEntity, PizzaProps } from "../../../domain/entities/pizza.entity";
import { SizeEntity } from "../../../domain/entities/size.entity";
import { CreatePizzaCategoryInput, CreatePizzaCategoryOutput, CreatePizzaIngredientInput, CreatePizzaIngredientOutput, CreatePizzaInput, CreatePizzaOutput, CreatePizzaSizeInput, CreatePizzaSizeOutput, CreatePizzaUseCase } from "../../../domain/usecases/pizza/create-pizza.usecase";
import { CreateInput } from "../../model/pizza.model";
import { Validation } from "../../model/validate.model";
import { FindCategoryByIdRepository } from "../../repositories/category/find-category-by-id.repository";
import { FindIngredientByIdRepository } from "../../repositories/ingredient/find-ingredient-by-id.repository";
import { CreatePizzaRepository } from "../../repositories/pizza/create-pizza.repository";
import { FindSizeByIdRepository } from "../../repositories/size/find-size-by-id.repository";

export class CreatePizza implements CreatePizzaUseCase {
    constructor(
        private readonly createPizzaRepository: CreatePizzaRepository,
        private readonly validation: Validation,
        private readonly findSizeByIdRepository: FindSizeByIdRepository,
        private readonly findIngredientByIdRepository: FindIngredientByIdRepository,
        private readonly findCategoryByIdRepository: FindCategoryByIdRepository
    ) { }

    async create(data: CreatePizzaInput, schema: any): Promise<CreatePizzaOutput> {
        this.validation.validate(schema, data)

        const sizes = await this.verifyIfSizeExists(data.size)
        const ingredients = await this.verifyIfIngredientExists(data.ingredient)
        const category = await this.verifyIfCategoryExists(data.category)

        const createIngredients = ingredients.map(item => new IngredientEntity({ id: item.ingredient_id, name: item.name, price: item.price }))
        const createSizes = sizes.map(item => new SizeEntity({ id: item.size_id, name: item.name, price: item.price }))
        const createCategory = new CategoryEntity({ id: category.category_id, name: category.name })
        const input: PizzaProps = {
            ...data,
            category: createCategory,
            ingredient: createIngredients,
            size: createSizes
        }
        const createPizza = new PizzaEntity(input)
        const object = createPizza.toJSON()

        const pizza: CreateInput = {
            ...object,
            category: { category_id: object.category.id },
            ingredient: object.ingredient.map(item => {
                return { ingredient_id: item.getId }
            }),
            size: createPizza.calculatePrices().map(item => {
                return {
                    size_id: item.size,
                    price: item.price
                }
            })
        }

        const save = await this.createPizzaRepository.create(pizza)

        return save
    }

    async verifyIfCategoryExists(category: CreatePizzaCategoryInput): Promise<CreatePizzaCategoryOutput> {
        const result = await this.findCategoryByIdRepository.find(category.category_id)
        if (!result) throw new Error('CATEGORY_NOT_FOUND')
        return { category_id: result.id, name: result.name }
    }

    async verifyIfIngredientExists(ingredient: CreatePizzaIngredientInput): Promise<CreatePizzaIngredientOutput> {
        const result = await Promise.all(ingredient.map(async item => {
            const unit = await this.findIngredientByIdRepository.find(item.ingredient_id)
            if (!unit) throw new Error('INGREDIENT_NOT_FOUND')
            return unit
        }))

        return result.map(item => {
            return { ingredient_id: item.id, name: item.name, price: item.price }
        })
    }

    async verifyIfSizeExists(size: CreatePizzaSizeInput): Promise<CreatePizzaSizeOutput> {
        const result = await Promise.all(size.map(async item => {
            const unit = await this.findSizeByIdRepository.find(item.size_id)
            if (!unit) throw new Error('SIZE_NOT_FOUND')
            return unit
        }))

        return result.map(item => {
            return { size_id: item.id, name: item.name, price: item.price }
        })

    }
}