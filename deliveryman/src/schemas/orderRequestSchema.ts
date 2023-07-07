import * as yup from "yup";
import IDeliveryman from "../interfaces/Deliveryman";

interface IBodyProps extends Omit<IDeliveryman, "id"> { }

export const deliverymanBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        name: yup.string().required(),
        isOnline: yup.boolean().notRequired(),
        lat: yup.number().required(),
        lng: yup.number().required(),
        password: yup.string().min(5).required()
    });