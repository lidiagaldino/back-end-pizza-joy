export interface DeleteAddressRepository {
    delete(id: number): Promise<boolean>
}