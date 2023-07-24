export interface UpdatePizzasPriceRepository {
    updatePrice(data: { id: number, diferency: number }): Promise<boolean>
}