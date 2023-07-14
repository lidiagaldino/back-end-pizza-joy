import { AdminInput, AdminOutput } from "../models/admin.model";


export interface CheckAccountEmailRepository {
    verifyIfExists(admin: AdminInput): Promise<AdminOutput>
}