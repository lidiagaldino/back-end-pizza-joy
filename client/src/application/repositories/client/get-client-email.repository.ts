import { GetByEmailInput, GetByEmailOutput } from "../../models/client.model";

export interface GetClientByEmailRepository {
    find(client: GetByEmailInput): Promise<GetByEmailOutput>
}