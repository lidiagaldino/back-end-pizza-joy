export default interface IPizza {
    id: number
    name: string,
    description: string,
    ingredient: { ingredient_id: number }[],
    size: {
        size_id: number,
        price: number
    }[]
}