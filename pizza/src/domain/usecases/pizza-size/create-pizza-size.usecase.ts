export interface CreatePizzaSizeUseCase {
    create(data: CreatePizzaSizeInput, schema: any): Promise<CreatePizzaSizeOutput>
}

export type CreatePizzaSizeInput = {
    pizza_id: number,
    size_id: number
}

export type CreatePizzaSizeOutput = {
    id: number,
    pizza_id: number,
    size_id: number
}