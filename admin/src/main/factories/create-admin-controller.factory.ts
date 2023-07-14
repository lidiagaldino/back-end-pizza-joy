import { CreateAdmin } from "../../application/services/create-admin.service";
import { AdminRepository } from "../../infra/repositories/admin.repository";
import { YupAdapter } from "../../infra/yup/yup.adapter";
import { Controller } from "../../presentation/contracts/controller";
import { AdminController } from "../../presentation/controllers/create-admin.controller";

export const makeCreateAdminController = (schema: any): Controller => {
    const repository = new AdminRepository()
    const validation = new YupAdapter()
    const loader = new CreateAdmin(repository, validation)
    return new AdminController(loader, schema)
}