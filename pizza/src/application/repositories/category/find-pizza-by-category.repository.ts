import { findByCategoryOutput } from "../../model/category.model";

export interface FindPizzaByCategoryRepository {
    findPizza(id: number): Promise<findByCategoryOutput>
}