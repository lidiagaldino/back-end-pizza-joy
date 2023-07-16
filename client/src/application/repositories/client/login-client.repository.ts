import { LoginInput, LoginOutput } from "../../models/client.model";

export interface LoginClientRepository {
    insert(client: LoginInput): Promise<LoginOutput>
}