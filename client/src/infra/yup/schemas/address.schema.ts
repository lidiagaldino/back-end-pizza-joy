import * as yup from "yup";
import { AddressProps } from "../../../domain/entities/address.entity";

interface IBodyProps extends AddressProps { }

export const addressBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        cep: yup.string().min(9).max(9).required(),
        street: yup.string().required(),
        complement: yup.string().notRequired(),
        neighborhood: yup.string().required(),
        city: yup.string().required(),
        uf: yup.string().min(2).max(2).required(),
        number: yup.string().required(),
        lat: yup.number().required(),
        lng: yup.number().required()
    });