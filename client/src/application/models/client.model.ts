import { CreateClientInput, CreateClientOutput } from "../../domain/usecases/client/create-client.usecase";
import { GetClientByEmailInput, GetClientByEmailOutput } from "../../domain/usecases/client/get-client-email.usecase";
import { GetClientByIdInput, GetClientByIdOutput } from "../../domain/usecases/client/get-client-id.usecase";
import { LoginClientInput, LoginClientOutput } from "../../domain/usecases/client/login-client.usecase";
import { UpdateClientInput, UpdateClientOutput } from "../../domain/usecases/client/update-client.usecase";

export type CreateInput = CreateClientInput
export type CreateOutput = CreateClientOutput

export type UpdateInput = UpdateClientInput
export type UpdateOutput = UpdateClientOutput

export type GetByEmailInput = GetClientByEmailInput
export type GetByEmailOutput = GetClientByEmailOutput

export type LoginInput = LoginClientInput
export type LoginOutput = LoginClientOutput

export type GetByIdInput = GetClientByIdInput
export type GetByIdOutput = GetClientByIdOutput 