import * as yup from "yup";
import IPizzaSize from "../interfaces/PizzaSize";

interface IBodyProps extends Omit<IPizzaSize, "id"> { }

export const pizzaSizeBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        size_id: yup.number().integer().positive().required(),
        price: yup.number().positive().required(),
        pizza_id: yup.number().positive().integer().required()
    });