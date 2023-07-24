import { CreateSize } from "../../../application/services/size/create-size.service"
import { SizeRepository } from "../../../infra/repositories/size.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { CreateSizeController } from "../../../presentation/controllers/size/create-size.controller"

export const makeCreateSizeController = (schema: any) => {
    const repository = new SizeRepository()
    const validation = new YupAdapter()
    const loader = new CreateSize(repository, validation)
    return new CreateSizeController(loader, schema)
}