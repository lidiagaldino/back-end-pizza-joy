import * as yup from "yup";
import ILogin from "../interfaces/Login";

interface IBodyProps extends ILogin { }

export const loginBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
    });