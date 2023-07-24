import { Pizza } from "@prisma/client";
import { PizzaProps } from "../../entities/pizza.entity";

export interface FindPizzaByIngredientUseCase {
    findByIngredient(ingredient_id: number): Promise<FindPizzaByIngredient>
}

export type FindPizzaByIngredient = PizzaProps