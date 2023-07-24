import { CategoryProps } from "../../entities/category.entity"
import { IngredientProps } from "../../entities/ingredient.entity"
import { SizeProps } from "../../entities/size.entity"

export interface GetPizzaByIdUseCase {
    find(id: GetPizzaByIdInput): Promise<GetPizzaByIdOutput>
}

export type GetPizzaByIdInput = number
export type GetPizzaByIdOutput = {
    id: number,
    name: string,
    description: string,
    photo: string,
    category: CategoryProps,
    ingredient: IngredientProps[],
    size: SizeProps[]
}