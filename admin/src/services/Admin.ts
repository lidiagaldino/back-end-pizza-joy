import IAdmin from "../interfaces/Admin";
import prisma from "../lib/db";
import bcrypt from 'bcryptjs'

class Admin {
    async newAdmin(data: Omit<IAdmin, "id">): Promise<IAdmin | false> {
        try {
            const result = await prisma.admin.create({
                data: {
                    email: data.email,
                    password: bcrypt.hashSync(data.password, 8)
                }
            })

            result.password = ""

            return result
        } catch (error) {
            return false
        }
    }

    async getById(id: number): Promise<IAdmin | false> {
        const admin = await prisma.admin.findUnique({
            where: { id }
        })

        admin.password = ""

        return admin ? admin : false
    }

    async getByEmail(email: string): Promise<IAdmin | false> {
        const admin = await prisma.admin.findUnique({
            where: { email }
        })

        return admin ? admin : false
    }

    async update(data: Omit<IAdmin, "id">, id: number): Promise<IAdmin | false> {

        try {
            const result = await prisma.admin.update({
                where: { id },
                data: {
                    email: data.email,
                    password: bcrypt.hashSync(data.password, 8)
                }
            })

            result.password = ""

            return result
        } catch (error) {
            return false
        }

    }
}

export default new Admin()