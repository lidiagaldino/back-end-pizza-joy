import { Router } from "express";
import { auth } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { adaptRoute } from "../adapter/express-route.adapter";
import { makeCreatePizzaController } from "../factories/pizza/create-pizza.controller.factory";
import { pizzaBodyValidation } from "../../infra/yup/schemas/pizza.schema";
import { makeUpdatePizzaController } from "../factories/pizza/update-pizza.controller.factory";
import { updatePizzaBodyValidation } from "../../infra/yup/schemas/update-pizza.schema";
import { makeGetAllPizzasController } from "../factories/pizza/get-all-pizzas.controller.factory";
import { makeGetPizzaByIdController } from "../factories/pizza/get-pizza-by-id.controller.factory";
import { makeDeletePizzaController } from "../factories/pizza/delete-pizza.controller.factory";

const routes = Router()

routes.post('/', auth, isAdmin, adaptRoute(makeCreatePizzaController(pizzaBodyValidation)))
routes.put('/:id', auth, isAdmin, adaptRoute(makeUpdatePizzaController(updatePizzaBodyValidation)))
routes.delete('/:id', auth, isAdmin, adaptRoute(makeDeletePizzaController()))

routes.get('/', adaptRoute(makeGetAllPizzasController()))
routes.get('/:id', adaptRoute(makeGetPizzaByIdController()))

export default routes