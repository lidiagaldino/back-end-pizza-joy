import { PizzaProps } from "../../entities/pizza.entity";
import { SizeProps } from "../../entities/size.entity";

export interface FindPizzaBySizeUseCase {
    findBySize(size_id: number): Promise<PizzaProps>
}