export interface DeleteClientRepository {
    delete(id: number): Promise<boolean>
}