import { VerifyIfPizzaSizeExistsRepository } from "../../application/repositories/verify-pizza-size.repository";
import { requests } from "../lib/axios";

export class PizzaSizeRepository implements VerifyIfPizzaSizeExistsRepository {
    async findPizzaSize(data: { pizza_id: number; size_id: number; }[]): Promise<{ id: number; size_id: number; name: string; image: string; price: number; }[]> {
        const result = data.map(async item => {
            return requests.get(`http://localhost:3002/pizza-size/${item.pizza_id}/${item.size_id}`).then(data => data.data)
        })

        const resolve = await Promise.all(result)

        if (!resolve) throw new Error('UNABLE_TO_REQUEST')
        return resolve as unknown as { id: number; name: string; image: string; price: number; size_id: number }[]
    }
}