export type HttpResponse<T = any> = {
    statusCode: number,
    data: T
}

export type HttpRequest<TParams = any, TUser = any, TBody = any> = {
    params: TParams,
    user: TUser,
    body: TBody
}
