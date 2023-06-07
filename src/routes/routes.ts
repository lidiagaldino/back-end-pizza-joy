import { Router } from "express";
import { UsuarioAdm } from "../controllers/usuarioController";
import { PizzaRequisitions } from "../controllers/pizzaController";

const router = Router();

const usuarioRequisitions = new UsuarioAdm();
const pizzaRequisitions = new PizzaRequisitions();

router.post("/usuario/adm", usuarioRequisitions.handlePost);
router.post("/usuario/adm/login", usuarioRequisitions.handleLogin);
router.get("/usuarios/adm", usuarioRequisitions.handleGetAll);
router.delete("/usuario/:id/adm", usuarioRequisitions.handleDeleteById);
router.put("/usuario/:id/adm", usuarioRequisitions.handleUpdateById);
router.get("/usuario/:id/adm", usuarioRequisitions.handleGetById);

router.post("/pizza", pizzaRequisitions.handlePostPizza);
router.get("/pizzas", pizzaRequisitions.handleGetAllPizzas);
router.delete("/pizza/:id", pizzaRequisitions.handleDeletePizzaById);

export { router };
