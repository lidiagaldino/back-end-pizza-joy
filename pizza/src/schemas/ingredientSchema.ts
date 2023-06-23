import * as yup from "yup";
import IIngredient from "../interfaces/Ingredient";

interface IBodyProps extends Omit<IIngredient, "id"> { }

export const ingredientBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
        price: yup.number().positive().required()
    });