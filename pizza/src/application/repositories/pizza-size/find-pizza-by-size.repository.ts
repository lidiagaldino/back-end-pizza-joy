import { PizzaProps } from "../../../domain/entities/pizza.entity";
import { FindPizzaOutput } from "../../model/pizza-size.model";

export interface FindPizzaBySizeRepository {
    findBySize(size_id: number): Promise<FindPizzaOutput>
}