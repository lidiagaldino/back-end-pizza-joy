import { SchemaOf, ValidationError } from "yup";
import { Validation } from "../../application/model/validate.model";


export class YupAdapter implements Validation {
    validate(schema: SchemaOf<any>, props: any): boolean {
        const errorsResult: Record<string, Record<string, string>> = {}

        try {
            schema.validateSync(props, { abortEarly: false })
        } catch (error) {
            const yuperror = error as ValidationError
            const errors: Record<string, string> = {}

            yuperror.inner.forEach(e => {
                if (!e.path) return

                errors[e.path] = e.message
            })
            errorsResult.errors = errors

        }

        if (Object.entries(errorsResult).length === 0) {
            return true
        } else {
            throw new Error(JSON.stringify(errorsResult))
        }
    }

}
