import { PizzaProps } from "../../entities/pizza.entity";

export interface FindPizzaBySizeUseCase {
    findBySize(size_id: number): Promise<FindPizzaBySizeOutput>
}

export type FindPizzaBySizeOutput = PizzaProps[]