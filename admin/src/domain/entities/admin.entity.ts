export type TAdminProps = {
    id?: number,
    email: string,
    password: string
}

export class Admin {
    public props: TAdminProps

    constructor(props: TAdminProps) {
        this.props = props
    }

    get email() {
        return this.props.email
    }

    toJSON() {
        return this.props
    }
}