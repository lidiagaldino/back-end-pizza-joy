import { DeleteSize } from "../../../application/services/size/delete-size.service"
import { SizeRepository } from "../../../infra/repositories/size.repository"
import { DeleteSizeController } from "../../../presentation/controllers/size/delete-size.controller"

export const makeDeleteSizeController = () => {
    const repository = new SizeRepository()
    const loader = new DeleteSize(repository, repository)
    return new DeleteSizeController(loader)
}