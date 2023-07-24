import { DeleteInput, DeleteOutput } from "../../model/size.model";

export interface DeleteSizeRepository {
    delete(id: DeleteInput): Promise<DeleteOutput>
}