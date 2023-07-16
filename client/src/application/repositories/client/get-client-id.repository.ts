import { GetByIdInput, GetByIdOutput } from "../../models/client.model";

export interface GetClientByIdRepository {
    search(client: GetByIdInput): Promise<GetByIdOutput>
}