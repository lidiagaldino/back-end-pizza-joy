import { CreateInput, CreateOutput } from "../../model/pizza-size.model";

export interface CreatePizzaSizeRepository {
    create(data: CreateInput): Promise<CreateOutput>
}