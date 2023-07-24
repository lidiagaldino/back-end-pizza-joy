import * as yup from "yup";

interface IBodyProps { name: string }

export const categoryBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
    });