export type IngredientProps = {
    id: number,
    name: string,
    price: number
}

export class IngredientEntity {
    constructor(private props: IngredientProps) { }

    get getId(): number {
        return this.props.id
    }

    get getPrice(): number {
        return this.props.price
    }
}