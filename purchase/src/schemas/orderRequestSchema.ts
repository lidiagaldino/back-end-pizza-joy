import * as yup from "yup";
import IOrderProductRequest from "../interfaces/OrderProductRequest";

interface IBodyProps extends IOrderProductRequest { }

export const orderRequestBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        product_id: yup.array().of(yup
            .object({
                id: yup.number().integer().positive().required(),
                quantity: yup.number().integer().positive().required()
            })),
        location: yup.object({ lat: yup.number().required(), lng: yup.number().required(), complement: yup.string().notRequired() })
    });