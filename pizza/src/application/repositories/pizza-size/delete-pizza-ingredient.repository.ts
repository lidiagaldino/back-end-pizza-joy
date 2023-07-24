import { DeleteInput, DeleteOutput } from "../../model/pizza-size.model";

export interface DeletePizzaSizeRepository {
    delete(data: DeleteInput): Promise<DeleteOutput>
}