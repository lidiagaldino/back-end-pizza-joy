import { SchemaOf, ValidationError } from "yup";

export const validation = (schemas: SchemaOf<any>, props: any) => {
    const errorsResult: Record<string, Record<string, string>> = {}

    try {
        schemas.validateSync(props, { abortEarly: false })
    } catch (error) {
        const yuperror = error as ValidationError
        const errors: Record<string, string> = {}

        yuperror.inner.forEach(e => {
            if (!e.path) return

            errors[e.path] = e.message

            errorsResult[e.path] = errors
        })


    }

    if (Object.entries(errorsResult).length === 0) {
        return props
    } else {
        throw new Error(JSON.stringify(errorsResult))
    }
}