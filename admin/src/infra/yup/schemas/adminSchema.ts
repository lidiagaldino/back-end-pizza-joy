import * as yup from "yup";

type props = { email: string, password: string }

interface IBodyProps extends props { }

export const adminBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
    });