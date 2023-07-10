import prisma from '../lib/db'

class Status {
    async online(id: number) {
        try {
            const result = await prisma.deliveryman.update({
                where: {
                    id
                },
                data: {
                    isOnline: true
                }
            })

            return result
        } catch (error) {
            return false
        }
    }

    async ofline(id: number) {
        try {
            const result = await prisma.deliveryman.update({
                where: {
                    id
                },
                data: { isOnline: false }
            })

            return result
        } catch (error) {
            return false
        }
    }

    async busy(id: number) {
        try {
            const result = await prisma.deliveryman.update({
                where: {
                    id
                },
                data: {
                    isBusy: true
                }
            })

            return result
        } catch (error) {
            return false
        }
    }

    async free(id: number) {
        try {
            const result = await prisma.deliveryman.update({
                where: { id },
                data: { isBusy: false }
            })

            return result
        } catch (error) {
            return false
        }
    }
}

export default new Status()