import { Encrypter, Verify, jwtPayload } from "../../application/models/criptography.model";
import jwt from 'jsonwebtoken'


export class JwtAdapter implements Verify, Encrypter {
    constructor(private readonly secret: string) { }

    encrypt(object: jwtPayload): string {
        return jwt.sign(object, this.secret, { expiresIn: '7d' })
    }

    verify(value: string): jwtPayload | false {
        try {
            return jwt.verify(value, this.secret) as jwtPayload
        } catch (error) {
            return false
        }

    }
}