import * as yup from "yup";

interface IBodyProps { name: string, price: number }

export const sizeBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
        price: yup.number().positive().required()

    });