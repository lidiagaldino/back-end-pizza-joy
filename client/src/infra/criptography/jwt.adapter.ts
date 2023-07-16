import jwt from 'jsonwebtoken'
import { Verify } from '../../application/models/criptography/session/verify.model'
import { Encrypter } from '../../application/models/criptography/session/encrypter.model'
import { jwtPayload } from '../../application/models/criptography/session/jwt-payload.model'


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
