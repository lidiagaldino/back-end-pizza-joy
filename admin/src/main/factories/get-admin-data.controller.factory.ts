import { getAllJSDocTags } from "typescript";
import { CreateAdmin } from "../../application/services/create-admin.service";
import { GetAdminData } from "../../application/services/get-admin-data.service";
import { AdminRepository } from "../../infra/repositories/admin.repository";
import { Controller } from "../../presentation/contracts/controller";
import { AdminController } from "../../presentation/controllers/create-admin.controller";
import { GetAdminDataController } from "../../presentation/controllers/get-admin-data.controller";

export const makeGetAdminDataController = (): Controller => {
    const repository = new AdminRepository()
    const loader = new GetAdminData(repository)
    return new GetAdminDataController(loader)
}