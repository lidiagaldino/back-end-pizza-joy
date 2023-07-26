export interface VerifyIfPizzaSizeExistsRepository {
    findPizzaSize(data: { pizza_id: number, size_id: number }[]): Promise<{ id: number, name: string, image: string, price: number, size_id: number }[]>
}