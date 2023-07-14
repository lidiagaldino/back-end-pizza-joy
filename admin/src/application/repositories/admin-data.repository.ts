import { AdminDataInput, AdminDataOutput } from "../../domain/usecases/get-admin-data.use-case";


export interface GetAdminDataRepository {
    get(id: AdminDataInput): Promise<AdminDataOutput>
}