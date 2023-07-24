import { idText } from "typescript";
import { CategoryEntity } from "./category.entity"
import { IngredientEntity } from "./ingredient.entity"
import { SizeEntity } from "./size.entity"

export type PizzaProps = {
    name: string,
    photo: string,
    description: string,
    ingredient: IngredientEntity[],
    size: SizeEntity[],
    category: CategoryEntity
}

export class PizzaEntity {
    constructor(
        private props: PizzaProps
    ) { }

    calculatePrices() {
        const ingredientPrices = this.props.ingredient.map(item => item.getPrice)

        const prices = this.props.size.map(size => {
            return {
                size: size.getId,
                price: ingredientPrices.reduce((acc, value) => acc + value) + size.getPrice
            }
        })

        return prices
    }

    toJSON(): PizzaProps {
        return this.props
    }
} 