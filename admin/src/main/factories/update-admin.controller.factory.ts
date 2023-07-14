import { UpdateAdmin } from "../../application/services/update-admin.service";
import { JwtAdapter } from "../../infra/criptography/jwt.adapter";
import { AdminRepository } from "../../infra/repositories/admin.repository";
import { YupAdapter } from "../../infra/yup/yup.adapter";
import { Controller } from "../../presentation/contracts/controller";
import { UpdateAdminController } from "../../presentation/controllers/update-admin.controller";

export const makeUpdateAdminController = (schema: any): Controller => {
    const repository = new AdminRepository()
    const validation = new YupAdapter()
    const loader = new UpdateAdmin(repository, validation)
    return new UpdateAdminController(loader, schema)
}