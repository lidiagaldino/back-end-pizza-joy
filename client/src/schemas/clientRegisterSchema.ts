import * as yup from "yup";
import IClient from "../interfaces/Client";

interface IBodyProps extends Omit<IClient, "id"> { }

export const clientRegisterBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        name: yup.string().min(5).required(),
        password: yup.string().min(5).required(),
        phone: yup.string().min(11).required(),
        address: yup.object({
            id: yup.number().notRequired(),
            cep: yup.string().required(),
            street: yup.string().required(),
            neighborhood: yup.string().required(),
            city: yup.string().required(),
            uf: yup.string().required(),
            complement: yup.string().required(),
            number: yup.string().required()
        }).required()
    });