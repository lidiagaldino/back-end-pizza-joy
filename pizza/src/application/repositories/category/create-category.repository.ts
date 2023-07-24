import { CreateInput, CreateOutput } from "../../model/category.model";

export interface CreateCategoryRepository {
    create(category: CreateInput): Promise<CreateOutput>
}