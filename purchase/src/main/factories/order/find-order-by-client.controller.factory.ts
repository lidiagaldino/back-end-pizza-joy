import { FindOrderByClient } from "../../../application/services/find-order-by-client.service"
import { OrderRepository } from "../../../infra/repositories/order.repository"
import { FindOrderByClientController } from "../../../presentation/controllers/order/find-order-by-client.controller"

export const makeFindOrderByClientController = () => {
    const repository = new OrderRepository()
    const loader = new FindOrderByClient(repository)
    return new FindOrderByClientController(loader)
}