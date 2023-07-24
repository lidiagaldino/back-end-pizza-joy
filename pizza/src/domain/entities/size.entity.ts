export type SizeProps = {
    id: number, name: string, price: number
}

export class SizeEntity {
    constructor(private props: SizeProps) { }

    get getName(): string {
        return this.props.name
    }

    get getPrice(): number {
        return this.props.price
    }

    get getId(): number {
        return this.props.id
    }
}