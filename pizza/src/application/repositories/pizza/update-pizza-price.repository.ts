export interface updatePizzaPriceRepository {
    updatePizzaPrice(data: { id: number, diferency: number }): Promise<boolean>
}