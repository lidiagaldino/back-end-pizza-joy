export interface Verify {
    verify(value: string): jwtPayload | false
}

export interface Encrypter {
    encrypt(object: jwtPayload): string
}

export type jwtPayload = {
    id: number,
    modo: 'ADMIN' | 'CLIENT' | 'DELIVERYMAN',
}


export interface HashComparer {
    compare(password: string, hash: string): Promise<boolean>
}
