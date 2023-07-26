import { FindPizzaSizeInput, FindPizzaSizeOutput } from "../../model/pizza-size.model";

export interface FindPizzasSizeRepository {
    findPizzasSize(data: FindPizzaSizeInput): Promise<FindPizzaSizeOutput>
}