import { PizzaEntity } from "../../../domain/entities/pizza.entity";
import { SizeProps } from "../../../domain/entities/size.entity";
import { UpdateSizeInput, UpdateSizeUseCase } from "../../../domain/usecases/size/update-size.usecase";
import { Validation } from "../../model/validate.model";
import { FindPizzaBySizeRepository } from "../../repositories/pizza-size/find-pizza-by-size.repository";
import { UpdatePizzasPriceRepository } from "../../repositories/pizza/update-pizza-price-size.repository";
import { FindSizeByIdRepository } from "../../repositories/size/find-size-by-id.repository";
import { UpdateSizeRepository } from "../../repositories/size/update-size.repository";

export class UpdateSize implements UpdateSizeUseCase {
    constructor(
        private readonly updateSizeRepository: UpdateSizeRepository,
        private readonly findSizeByIdRepository: FindSizeByIdRepository,
        private readonly findPizzaBySize: FindPizzaBySizeRepository,
        private readonly updatePizzaPrice: UpdatePizzasPriceRepository,
        private readonly validation: Validation
    ) { }

    async update(size: UpdateSizeInput, id: number, schema: any): Promise<SizeProps> {
        this.validation.validate(schema, size)

        const verifyIfExists = await this.findSizeByIdRepository.find(id)
        if (!verifyIfExists) throw new Error('SIZE_NOT_FOUND')

        const result = await this.updateSizeRepository.update(size, id)
        this.updatePizzaPrices((verifyIfExists.price - result.price), result.id)
        return result
    }

    async updatePizzaPrices(diferency: number, size: number): Promise<boolean> {
        const pizzas = this.findPizzaBySize.findBySize(size)
        if (!pizzas) return true

        console.log(diferency);
        await this.updatePizzaPrice.updatePrice({ id: size, diferency })

        return true
    }
}