
import bcrypt from 'bcryptjs'
import { HashComparer } from '../../application/models/criptography/password/hash-comparer.model'
import { Hasher } from '../../application/models/criptography/password/hasher.model'

export class BcryptAdapter implements HashComparer, Hasher {
    constructor(
        private readonly salt: number
    ) { }

    async compare(value: string, hash: string): Promise<boolean> {
        const isValid = await bcrypt.compare(value, hash)
        return isValid
    }

    hash(value: string): string {
        const hash = bcrypt.hashSync(value, this.salt)
        return hash
    }
}
