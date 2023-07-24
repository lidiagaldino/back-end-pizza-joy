export interface UpdatePizzasPriceIngredientRepository {
    updatePriceIngredient(data: { id: number, diferency: number }): Promise<boolean>
}