import * as yup from "yup";
import IPizzaIngredient from "../interfaces/PizzaIngredient";

interface IBodyProps extends Omit<IPizzaIngredient, "id"> { }

export const pizzaIngredientBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        ingredient_id: yup.number().integer().positive().required(),
        id_pizza: yup.number().positive().integer().required()
    });