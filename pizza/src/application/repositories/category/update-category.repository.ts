import { UpdateInput, UpdateOutput } from "../../model/category.model";

export interface UpdateCategoryRepository {
    update(category: UpdateInput, id: number): Promise<UpdateOutput>
}