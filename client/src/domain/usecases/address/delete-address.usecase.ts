export interface DeleteAddressUseCase {
    delete(id: number): Promise<boolean>
}