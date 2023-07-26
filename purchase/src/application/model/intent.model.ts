import { OrderIntentInput, OrderIntentOutput } from "../../domain/usecases/order-intent.usecase";

export interface Intent {
    createIntent(intent: createOrderIntentInput): Promise<createOrderIntentOutput>
}

export type createOrderIntentInput = OrderIntentInput
export type createOrderIntentOutput = OrderIntentOutput