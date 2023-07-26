import * as yup from "yup";

interface IBodyProps {
    product_id: { id: number, size_id: number, quantity: number }[],
    location: { lat: number, lng: number, complement: string }
}

export const paymenttBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        product_id: yup.array().of(yup
            .object({
                id: yup.number().integer().positive().required(),
                size_id: yup.number().integer().positive().required(),
                quantity: yup.number().integer().positive().required()
            })),
        location: yup.object({ lat: yup.number().required(), lng: yup.number().required(), complement: yup.string().notRequired() })
    });