import { CategoryProps } from "../../entities/category.entity"
import { IngredientProps } from "../../entities/ingredient.entity"
import { SizeProps } from "../../entities/size.entity"

export interface GetAllPizzasUseCase {
    index(): Promise<GetAllPizzasOutput>
}

export type GetAllPizzasOutput = {
    id: number,
    name: string,
    description: string,
    photo: string,
    category: CategoryProps,
    ingredient: IngredientProps[],
    size: SizeProps[]
}[]