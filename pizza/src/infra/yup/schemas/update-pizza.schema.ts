import * as yup from "yup";
import { UpdatePizzaInput } from "../../../domain/usecases/pizza/update-pizza.usecase";

interface IBodyProps extends UpdatePizzaInput { }

export const updatePizzaBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
        description: yup.string().required(),
        photo: yup.string().url().required(),
        category: yup.object({
            category_id: yup.number().integer().positive().required(),
        })
    });