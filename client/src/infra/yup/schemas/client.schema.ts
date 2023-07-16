import * as yup from "yup";
import { ClientProps } from "../../../domain/entities/client.entity";

interface IBodyProps extends ClientProps { }

export const clientBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        name: yup.string().min(5).required(),
        password: yup.string().min(5).required(),
        phone: yup.string().min(11).required(),
    });