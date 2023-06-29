import * as yup from "yup";
import IOrderStatus from "../interfaces/OrderStatus";

interface IBodyProps extends IOrderStatus { }

export const orderStatusBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        order_id: yup.number().integer().positive().required(),
        status: yup.string().notRequired()
    });