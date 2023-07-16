import { CreateInput, CreateOutput } from "../../models/client.model";

export interface CreateClientRepository {
    insert(client: CreateInput): Promise<CreateOutput>
}