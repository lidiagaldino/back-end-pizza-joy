import * as yup from "yup";
import { CreatePizzaInput } from "../../../domain/usecases/pizza/create-pizza.usecase";

interface IBodyProps extends CreatePizzaInput { }

export const pizzaBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
        description: yup.string().required(),
        photo: yup.string().url().required(),
        category: yup.object({
            category_id: yup.number().integer().positive().required(),
        }),
        ingredient: yup.array().of(yup.object({
            ingredient_id: yup.number().integer().positive().required(),
        })),
        size: yup.array().of(yup.object({
            size_id: yup.number().integer().positive().required(),
        }))
    });