import { UpdateOrderStatus } from "../../../application/services/update-order-status.service"
import { OrderRepository } from "../../../infra/repositories/order.repository"
import { YupAdapter } from "../../../infra/yup/yup.adaper"
import { UpdateOrderStatusController } from "../../../presentation/controllers/order/update-order-status.controller"

export const makeUpdateOrderStatusController = (schema: any) => {
    const repository = new OrderRepository()
    const validation = new YupAdapter()
    const loader = new UpdateOrderStatus(repository, repository, validation)
    return new UpdateOrderStatusController(loader, schema)
}