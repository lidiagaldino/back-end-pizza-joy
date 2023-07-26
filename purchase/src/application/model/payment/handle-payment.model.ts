export interface HandlePayment {
    handle(event: any, sig: string): Promise<HandleOutput>
}

export type HandleOutput = {
    paymentIntentSucceeded: any,
    customer: {
        metadata: {
            userId: string,
            cart: string,
            location: string
        }
    }
}