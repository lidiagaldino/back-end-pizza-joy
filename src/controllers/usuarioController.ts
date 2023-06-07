import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";
import IUsuario from "../interfaces/UsuarioInterface";
export class UsuarioAdm {
  async handlePost(request: Request, response: Response) {
    try {
      const { email, senha } = request.body;

      const usuario = await prismaClient.usuario_adm.create({
        data: {
          email,
          senha: bcrypt.hashSync(senha, 8),
        },
      });

      if (usuario) {
        return response.json(usuario).status(201);
      }
    } catch (error) {
      return response.json(error).status(400);
    }
  }
  async handleGetAll(request: Request, response: Response) {
    try {
      const usuarios = await prismaClient.usuario_adm.findMany({
        select: {
          id: true,
          email: true,
        },
      });
      if (usuarios) {
        return response.json(usuarios);
      }
    } catch {
      return response.json({ message: "Não temos" });
    }
  }
  async handleDeleteById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usuario = await prismaClient.usuario_adm.delete({
        where: {
          id: Number(id),
        },
      });

      if (usuario) {
        console.log(usuario);

        return response.json();
      }
    } catch {
      return response.status(400);
    }
  }
  async handleUpdateById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const { email } = request.body;

      if (
        email !== null ||
        email !== undefined ||
        (email !== "" && id !== null) ||
        id !== undefined ||
        id !== ""
      ) {
        const usuario = await prismaClient.usuario_adm.update({
          where: {
            id: Number(id),
          },
          data: {
            email,
          },
          select: {
            id: true,
            email: true,
          },
        });

        if (usuario) {
          return response.json(usuario);
        }
      }
    } catch {
      return response.status(400);
    }
  }
  async handleGetById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usuario = await prismaClient.usuario_adm.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (usuario !== null) {
        return response.json(usuario);
      } else if (usuario === null) {
        return response.status(400).json({
          message: "Não foi encontrado",
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: "Não foi possível se conectar ao database",
      });
    }
  }
  async handleLogin(request: Request, response: Response) {
    try {
      const { email, senha } = request.body;

      const usuario = await prismaClient.usuario_adm.findUnique({
        where: {
          email,
        },
      });

      if (usuario) {
        const validate = await bcrypt.compare(senha, usuario.senha || "");

        if (validate) {
          const token = jwt.sign(
            {
              id: usuario.id,
              email: usuario.email,
            },
            "asjkghdhasokcsdjmfcdsuij",
            {
              expiresIn: "7d",
            }
          );
          delete usuario.senha;
          return response.json({
            usuario,
            token,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Não foi possível se conectar ao database",
      });
    }
  }
}
