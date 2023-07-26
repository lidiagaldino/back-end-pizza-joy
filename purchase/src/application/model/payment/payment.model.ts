export interface Payment {
    makePayment(data: input): Promise<{ url: string }>
}

type input = { user_id: number, products: prods, location: loc }

type prods = {
    id: number,
    name: string,
    image: string,
    price: number,
    quantity: number
}[]
type loc = {
    lat: number,
    lng: number,
    complement: string
}