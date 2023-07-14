import { AdminInput, AdminOutput } from "../models/admin.model";


export interface IAdminRepository {
    insert(admin: AdminInput): Promise<AdminOutput>

    verifyIfExists(admin: AdminInput): Promise<AdminOutput>
}