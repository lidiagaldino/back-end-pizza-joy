export interface DeleteClientUseCase {
    delete(id: number): Promise<boolean>
}