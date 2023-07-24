import { CreateInput, CreateOutput } from "../../model/size.model";

export interface CreateSizeRepository {
    create(size: CreateInput): Promise<CreateOutput>
}
