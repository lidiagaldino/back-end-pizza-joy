export interface CreateOrderUseCase {
    create(order: any, sig: string): Promise<{ recieved: boolean }>
}
