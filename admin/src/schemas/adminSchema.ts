import * as yup from "yup";
import IAdmin from "../interfaces/Admin";

interface IBodyProps extends Omit<IAdmin, "id"> { }

export const adminBodyValidation: yup.SchemaOf<IBodyProps> = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
    });