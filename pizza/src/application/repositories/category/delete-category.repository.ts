import { DeleteInput, DeleteOutput } from "../../model/category.model";

export interface DeleteCategoryRepository {
    delete(id: DeleteInput): Promise<DeleteOutput>
}