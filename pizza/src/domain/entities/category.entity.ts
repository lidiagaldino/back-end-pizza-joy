export type CategoryProps = {
    id: number,
    name: string
}

export class CategoryEntity {
    constructor(private props: CategoryProps) { }

    get id(): number {
        return this.props.id
    }
}