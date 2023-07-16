import { UpdateInput, UpdateOutput } from "../../models/client.model";

export interface UpdateClientRepository {
    update(client: UpdateInput, id: number): Promise<UpdateOutput>
}