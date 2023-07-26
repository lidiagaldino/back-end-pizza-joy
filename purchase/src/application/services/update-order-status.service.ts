import { UpdateOrderStatusInput, UpdateOrderStatusOutput, UpdateOrderStatusUseCase } from "../../domain/usecases/update-order-status.usecase";
import { Validation } from "../model/validate.model";
import { FindOrderByIdRepository } from "../repositories/find-order-by-id.repository";
import { UpdateOrderSstatusRepository } from "../repositories/update-order-status.repository";

export class UpdateOrderStatus implements UpdateOrderStatusUseCase {
    constructor(
        private readonly updateOrderStatusRepository: UpdateOrderSstatusRepository,
        private readonly findOrderByIdRepository: FindOrderByIdRepository,
        private readonly validation: Validation
    ) { }

    async updateOrderStatus(data: UpdateOrderStatusInput, schema: any): Promise<UpdateOrderStatusOutput> {
        this.validation.validate(schema, data)

        const verify = await this.findOrderByIdRepository.find(data.order_id)
        if (!verify) throw new Error('NOT_FOUND')

        const result = this.updateOrderStatusRepository.updateStatus(data)
        return result
    }
}