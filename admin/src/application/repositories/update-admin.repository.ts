import { UpdateAdminInput, UpdateAdminOutput } from "../../domain/usecases/update-admin.use-case";

export interface UpdateAdminRepository {
    update(id: number, data: UpdateAdminInput): Promise<UpdateAdminOutput>
}