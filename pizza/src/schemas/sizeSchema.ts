import * as yup from "yup";
import ISize from "../interfaces/Size";

interface IBodyProps extends Omit<ISize, "id"> { }

export const sizeBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        name: yup.string().notRequired()

    });