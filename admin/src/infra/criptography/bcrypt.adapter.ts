
import bcrypt from 'bcryptjs'
import { HashComparer } from '../../application/models/criptography.model'

export class BcryptAdapter implements HashComparer {
    constructor(
        private readonly salt: number
    ) { }

    async compare(value: string, hash: string): Promise<boolean> {
        const isValid = await bcrypt.compare(value, hash)
        return isValid
    }

    async hash(value: string): Promise<string> {
        const hash = await bcrypt.hash(value, this.salt)
        return hash
    }
}
