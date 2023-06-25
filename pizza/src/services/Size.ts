import ISize from "../interfaces/Size";
import KafkaSendMessage from "../kafka/KafkaSendMessage";
import prisma from "../lib/db";

class Size {
    async create(size: Omit<ISize, 'id'>): Promise<ISize | false> {
        try {
            const result = await prisma.size.create({
                data: size
            })

            await KafkaSendMessage.execute('new-size', { external_id: result.id, name: result.name })
            return result
        } catch (error) {
            return false
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            await prisma.size.delete({
                where: {
                    id
                }
            })

            await KafkaSendMessage.execute('delete-size', { external_id: id })
            return true
        } catch (error) {
            return false
        }
    }

    async getAll(): Promise<ISize[] | false> {
        const result = await prisma.size.findMany()

        return result.length > 0 ? result : false
    }

    async getById(id: number): Promise<ISize | false> {
        const result = await prisma.size.findUnique({
            where: {
                id
            }
        })

        return result ? result : false
    }

    async update(size: Omit<ISize, 'id'>, id: number): Promise<ISize | false> {
        try {
            const result = await prisma.size.update({
                where: {
                    id
                },
                data: size
            })

            KafkaSendMessage.execute('update-size', { external_id: result.id, name: result.name })
            return result
        } catch (error) {
            return false
        }
    }
}

export default new Size()