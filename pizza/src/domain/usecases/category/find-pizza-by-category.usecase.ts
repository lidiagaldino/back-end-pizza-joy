import { Pizza } from "@prisma/client"
import { PizzaProps } from "../../entities/pizza.entity"
import { findByCategoryOutput } from "../../../application/model/category.model"

export interface FindPizzaByCategoryUseCase {
    findPizza(id: number): Promise<findByCategoryOutput>
}

export type FindPizzaByCategoryOutput = {
    id: number,
    name: string,
    photo: string,
    description: string,
    ingredient: FindPizzaByCategoryIngredientOutput,
    size: FindPizzaByCategorySizeOutput,
    category: FindPizzaByCategoryCategoryOutput
}[]

export type FindPizzaByCategoryIngredientInput = { ingredient_id: number }[]
export type FindPizzaByCategoryIngredientOutput = { ingredient_id: number, name: string, price?: number }[]

export type FindPizzaByCategorySizeInput = { size_id: number }[]
export type FindPizzaByCategorySizeOutput = { size_id: number, name: string, price: number }[]

export type FindPizzaByCategoryCategoryInput = { category_id: number }
export type FindPizzaByCategoryCategoryOutput = { category_id: number, name: string }