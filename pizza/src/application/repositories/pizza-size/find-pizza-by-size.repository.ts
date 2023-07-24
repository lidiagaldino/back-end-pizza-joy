import { PizzaProps } from "../../../domain/entities/pizza.entity";
import { SizeProps } from "../../../domain/entities/size.entity";

export interface FindPizzaBySizeRepository {
    findBySize(size_id: number): Promise<PizzaProps[]>
}