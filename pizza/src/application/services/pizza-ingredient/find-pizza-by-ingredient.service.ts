import { PizzaProps } from "../../../domain/entities/pizza.entity";
import { FindPizzaByIngredientUseCase } from "../../../domain/usecases/pizza-ingredient/find-pizza-by-ingredient.usecase";
import { FindPizzaByIngredientRepository } from "../../repositories/pizza-ingredient/find-pizza-by-ingredient.repository";

// export class FindPizzaByIngredient implements FindPizzaByIngredientUseCase {
//     constructor(
//         private readonly findPizzaByIngredientRepository: FindPizzaByIngredientRepository
//     ) { }

//     async findByIngredient(ingredient_id: number): Promise<PizzaProps> {

//     }
// }