import * as yup from "yup";
import { LoginInput } from "../../../application/models/client.model";

interface IBodyProps extends LoginInput { }

export const loginBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
    });