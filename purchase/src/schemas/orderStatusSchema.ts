import * as yup from "yup";
import IOrderStatus from "../interfaces/OrderStatus";

interface IBodyProps extends IOrderStatus { }

export const orderStatusBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        finished: yup.boolean(),
        on_way: yup.boolean(),
        ready_for_delivery: yup.boolean()
    });