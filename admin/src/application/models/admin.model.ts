import { AuthenticationInput, AuthenticationOutput } from "../../domain/usecases/authentication.use-case";
import { CreateAdminInput, CreateAdminOutput } from "../../domain/usecases/create-admin.use-case";
import { AdminDataInput, AdminDataOutput } from "../../domain/usecases/get-admin-data.use-case";
import { UpdateAdminInput as UpdateInput, UpdateAdminOutput as UpdateOutput } from "../../domain/usecases/update-admin.use-case";


export type AdminInput = CreateAdminInput
export type AdminOutput = CreateAdminOutput

export type UpdateAdminInput = UpdateInput
export type UpdateAdminOutput = UpdateOutput

export type AuthenticationAdminInput = AuthenticationInput
export type AuthenticationAdminOutput = AuthenticationOutput

export type GetAdminDataInput = AdminDataInput
export type GetAdminDataOutput = AdminDataOutput