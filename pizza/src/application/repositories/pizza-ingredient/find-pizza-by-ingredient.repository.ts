import { PizzaProps } from "../../../domain/entities/pizza.entity";

export interface FindPizzaByIngredientRepository {
    findByIngredient(ingredient_id: number): Promise<PizzaProps[]>
}