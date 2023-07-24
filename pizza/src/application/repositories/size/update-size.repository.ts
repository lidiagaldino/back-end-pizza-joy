import { UpdateInput, UpdateOutput } from "../../model/size.model";

export interface UpdateSizeRepository {
    update(size: UpdateInput, id: number): Promise<UpdateOutput>
}