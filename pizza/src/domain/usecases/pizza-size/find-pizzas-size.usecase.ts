import { PizzaProps } from "../../entities/pizza.entity"

export interface FindPizzasSizeUseCase {
    findPizzaSize(ids: { pizza_id: number, size_id: number }): Promise<FindPizzasSizeOutput>
}

export type FindPizzasSizeOutput = {
    id: number,
    name: string,
    photo: string,
    price: number,
    size_id: number
}