export default interface IOrderProductRequest {
    product_id: {
        id: number,
        quantity: number
    }[]
}