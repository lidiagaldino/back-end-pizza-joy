import * as yup from "yup";
import ICategory from "../interfaces/Category";

interface IBodyProps extends Omit<ICategory, "id"> { }

export const categoryBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().required(),
    });