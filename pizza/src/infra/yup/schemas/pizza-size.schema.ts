import * as yup from "yup";

interface IBodyProps { pizza_id: number, size_id: number }

export const pizzaSizeBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        size_id: yup.number().integer().positive().required(),
        pizza_id: yup.number().positive().integer().required()
    });