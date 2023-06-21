import * as yup from "yup";
import IClient from "../interfaces/Client";

interface IBodyProps extends Omit<IClient, "id" | "endereco"> { }

export const clientBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        nome: yup.string().min(5).required(),
        senha: yup.string().min(5).required(),
        telefone: yup.string().min(11).required(),
    });