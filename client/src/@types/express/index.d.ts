declare namespace Express {
    export interface Request {
        user: {
            id: number,
            modo: 'ADMIN' | 'CLIENT' | 'DELIVERYMAN',
        },
    }
}