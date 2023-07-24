import { FindSizeById } from "../../../application/services/size/find-size-by-id.service"
import { SizeRepository } from "../../../infra/repositories/size.repository"
import { FindSizeByIdController } from "../../../presentation/controllers/size/find-size-by-id.controller"

export const makeFindSizeByIdController = () => {
    const repository = new SizeRepository()
    const loader = new FindSizeById(repository)
    return new FindSizeByIdController(loader)
}