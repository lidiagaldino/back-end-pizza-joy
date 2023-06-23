import * as yup from "yup";
import IPizza from "../interfaces/Pizza";

interface IBodyProps extends Omit<IPizza, "id"> { }

export const pizzaBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
        description: yup.string().required(),
        ingredient: yup.array().of(yup.object({
            ingredient_id: yup.number().integer().positive().required(),
            name: yup.string().notRequired()
        })),
        size: yup.array().of(yup.object({
            size_id: yup.number().integer().positive().required(),
            price: yup.number().positive().required(),
            name: yup.string().notRequired()
        }))
    });