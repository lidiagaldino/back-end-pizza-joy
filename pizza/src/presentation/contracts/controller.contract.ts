import { HttpRequest, HttpResponse } from "./http.contract";

export interface Controller {
    handle(req: HttpRequest): Promise<HttpResponse>

}
