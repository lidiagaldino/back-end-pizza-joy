import * as yup from "yup";

interface IBodyProps { name: string, price: number }

export const ingredientBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
        price: yup.number().positive().required()
    });