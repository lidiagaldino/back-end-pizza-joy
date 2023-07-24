import * as yup from "yup";

interface IBodyProps { ingredient_id: number, pizza_id: number }

export const pizzaIngredientBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        ingredient_id: yup.number().integer().positive().required(),
        pizza_id: yup.number().positive().integer().required()
    });