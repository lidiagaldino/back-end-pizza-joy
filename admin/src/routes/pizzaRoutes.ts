import { Router } from "express";
import { auth } from "../middleware/auth";
import PizzaController from "../controllers/PizzaController";
import { isAdmin } from "../middleware/isAdmin";
import { validation } from "../middleware/validation";
import { pizzaBodyValidation } from "../schemas/pizzaSchema";

const routes = Router()

routes.post('/', auth, isAdmin, validation({ body: pizzaBodyValidation }), PizzaController.store)

export default routes