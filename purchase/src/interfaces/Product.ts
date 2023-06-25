export default interface IProduct {
    id: number,
    external_id: number,
    name: string,
    description: string,
    size: {
        size_id: number,
        price: number
    }[]
}