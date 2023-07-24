import { FindByIdInput, FindByIdOutput } from "../../model/size.model";

export interface FindSizeByIdRepository {
    find(id: FindByIdInput): Promise<FindByIdOutput>
}