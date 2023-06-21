import * as yup from "yup";
import IClient from "../interfaces/Client";

interface IBodyProps extends Omit<IClient, "id"> { }

export const clientRegisterBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        nome: yup.string().min(5).required(),
        senha: yup.string().min(5).required(),
        telefone: yup.string().min(11).required(),
        endereco: yup.object({
            id: yup.number().notRequired(),
            cep: yup.string().required(),
            logradouro: yup.string().required(),
            bairro: yup.string().required(),
            localidade: yup.string().required(),
            uf: yup.string().required(),
            complemento: yup.string().required(),
        }).required()
    });