import { Admin } from "../../domain/entities/admin.entity";
import { IAdminRepository } from "../../application/repositories/create-admin.repository";
import prisma from "../lib/db";
import bcrypt from 'bcryptjs'


export class AdminDB implements IAdminRepository {
    async insert(admin: Admin): Promise<number | false> {
        try {
            const result = await prisma.admin.create({
                data: {
                    email: admin.props.email,
                    password: bcrypt.hashSync(admin.props.password, 8)
                }
            })

            result.password = ""

            return result.id
        } catch (error) {
            return false
        }
    }

}