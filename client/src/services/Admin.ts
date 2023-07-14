// import IAdmin from "../interfaces/Admin";
// import prisma from "../lib/db";
// import bcrypt from 'bcryptjs'

// class Admin {
//     async newAdmin(data: Omit<IAdmin, "id">): Promise<IAdmin | false> {
//         try {
//             const result = await prisma.usuario_adm.create({
//                 data: {
//                     email: data.email,
//                     senha: bcrypt.hashSync(data.senha, 8)
//                 }
//             })

//             result.senha = ""

//             return result
//         } catch (error) {
//             return false
//         }
//     }

//     async getById(id: number): Promise<IAdmin | false> {
//         const admin = await prisma.usuario_adm.findUnique({
//             where: { id }
//         })

//         admin.senha = ""

//         return admin ? admin : false
//     }

//     async getByEmail(email: string): Promise<IAdmin | false> {
//         const admin = await prisma.usuario_adm.findUnique({
//             where: { email }
//         })

//         return admin ? admin : false
//     }

//     async update(data: Omit<IAdmin, "id">, id: number): Promise<IAdmin | false> {

//         try {
//             const result = await prisma.usuario_adm.update({
//                 where: { id },
//                 data: {
//                     email: data.email,
//                     senha: bcrypt.hashSync(data.senha, 8)
//                 }
//             })

//             result.senha = ""

//             return result
//         } catch (error) {
//             return false
//         }

//     }
// }

// export default new Admin()