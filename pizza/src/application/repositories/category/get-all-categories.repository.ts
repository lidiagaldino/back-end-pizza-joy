import { GetAllOutput } from "../../model/category.model";

export interface GetAllCategoriesRepository {
    show(): Promise<GetAllOutput>
}