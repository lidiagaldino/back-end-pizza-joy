import { jwtPayload } from "./jwt-payload.model";

export interface Verify {
    verify(value: string): jwtPayload | false
}
