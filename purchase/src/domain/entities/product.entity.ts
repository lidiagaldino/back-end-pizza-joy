export type ProductProps = {
    id: number,
    quantity: number,
    size_id: number
}

export class Product {
    constructor(
        private props: ProductProps
    ) { }

    get object() {
        return this.props
    }
}