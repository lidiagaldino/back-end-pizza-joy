import { Router } from "express";
import { UsuarioAdm } from "../controllers/usuarioController";

const router = Router();

const usuarioRequisitions = new UsuarioAdm();

router.post("/usuario/adm", usuarioRequisitions.handlePost);
router.post("/usuario/adm/login", usuarioRequisitions.handleLogin);
router.get("/usuarios/adm", usuarioRequisitions.handleGetAll);
router.delete("/usuario/:id/adm", usuarioRequisitions.handleDeleteById);
router.get("/usuario/:id/adm", usuarioRequisitions.handleGetById);

export { router };
