import * as yup from "yup";

interface IBodyProps { order_id: number, status_id: number }

export const orderStatusBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        order_id: yup.number().integer().positive().required(),
        status_id: yup.number().integer().positive().max(4).required()
    });