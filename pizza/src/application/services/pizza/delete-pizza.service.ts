import { DeletePizzaUseCase } from "../../../domain/usecases/pizza/delete-pizza.usecase";
import { DeletePizzaRepository } from "../../repositories/pizza/delete-pizza.repository";
import { GetPizzaByIdRepository } from "../../repositories/pizza/get-pizza-by-id.repository";

export class DeletePizza implements DeletePizzaUseCase {
    constructor(private readonly deletePizzaRepository: DeletePizzaRepository, private readonly getPizzaByIdRepository: GetPizzaByIdRepository) { }

    async delete(id: number): Promise<boolean> {
        const verifyPizza = await this.getPizzaByIdRepository.find(id)
        if (!verifyPizza) throw new Error('PIZZA_NOT_FOUND')

        const result = await this.deletePizzaRepository.delete(id)
        return result
    }
}