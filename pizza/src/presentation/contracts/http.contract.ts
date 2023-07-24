export type HttpResponse<T = any> = {
    statusCode: number,
    data: T
}

export type HttpRequest<TParams = any, TUser = any, TBody = any, TQuery = any> = {
    params: TParams,
    user: TUser,
    body: TBody,
    query: TQuery
}