export default interface IOrderProductRequest {
    product_id: {
        id: number,
        quantity: number
    }[],
    location: { lat: number, lng: number, complement?: string }
}