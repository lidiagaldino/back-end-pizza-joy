import { GetAllOutput } from "../../model/size.model";

export interface GetAllSizesRepository {
    index(): Promise<GetAllOutput>
}