import { GetAllSizes } from "../../../application/services/size/get-all-sizes.service"
import { SizeRepository } from "../../../infra/repositories/size.repository"
import { GetAllSizesController } from "../../../presentation/controllers/size/get-all-sizes.controller"

export const makeGetAllSizesController = () => {
    const repository = new SizeRepository()
    const loader = new GetAllSizes(repository)
    return new GetAllSizesController(loader)
}