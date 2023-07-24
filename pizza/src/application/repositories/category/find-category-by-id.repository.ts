import { FindByIdInput, FindByIdOutput } from "../../model/category.model";

export interface FindCategoryByIdRepository {
    find(id: FindByIdInput): Promise<FindByIdOutput>
}