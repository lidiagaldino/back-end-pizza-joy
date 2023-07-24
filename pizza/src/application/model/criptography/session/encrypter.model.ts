import { jwtPayload } from "./jwt-payload.model";

export interface Encrypter {
    encrypt(object: jwtPayload): string
}
