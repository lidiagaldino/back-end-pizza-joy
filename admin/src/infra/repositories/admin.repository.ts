import { IAdminRepository } from "../../application/repositories/create-admin.repository";
import { AdminInput, AdminOutput, UpdateAdminInput, UpdateAdminOutput } from "../../application/models/admin.model";
import { prisma } from "../db/prisma";
import bcrypt from 'bcryptjs'
import { UpdateAdminRepository } from "../../application/repositories/update-admin.repository";
import { CheckAccountEmailRepository } from "../../application/repositories/check-account-email.repository";
import { GetAdminDataRepository } from "../../application/repositories/admin-data.repository";
import { AdminDataOutput } from "../../domain/usecases/get-admin-data.use-case";

export class AdminRepository implements IAdminRepository, UpdateAdminRepository, CheckAccountEmailRepository, GetAdminDataRepository {

    async get(id: number): Promise<AdminDataOutput> {
        const result = await prisma.admin.findUnique({ where: { id } })
        delete result.password

        return result
    }

    async update(id: number, data: UpdateAdminInput): Promise<UpdateAdminOutput> {
        const result = await prisma.admin.update({
            where: { id: Number(id) },
            data: {
                email: data.email,
                password: bcrypt.hashSync(data.password, 8)
            }
        })

        result.password = ""

        return result
    }

    async verifyIfExists(admin: AdminInput): Promise<AdminOutput> {
        const result = await prisma.admin.findFirst({
            where: { email: admin.email }
        })

        return result
    }

    async insert(admin: AdminInput): Promise<AdminOutput> {


        const result = await prisma.admin.create({
            data: {
                email: admin.email,
                password: bcrypt.hashSync(admin.password, 8)
            }
        })

        result.password = ""

        return result
    }

}