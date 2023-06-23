import { Router } from "express";
import { auth } from "../middleware/auth";
import PizzaController from "../controllers/PizzaController";
import { isAdmin } from "../middleware/isAdmin";
import { validation } from "../middleware/validation";
import { pizzaBodyValidation } from "../schemas/pizzaSchema";
import PizzaSizeController from "../controllers/PizzaSizeController";
import { pizzaSizeBodyValidation } from "../schemas/pizzaSizeSchema";
import { pizzaIngredientBodyValidation } from "../schemas/pizzaIngredientSchema";
import PizzaIngredientController from "../controllers/PizzaIngredientController";

const routes = Router()

routes.post('/', auth, isAdmin, validation({ body: pizzaBodyValidation }), PizzaController.store)
routes.put('/:id', auth, isAdmin, validation({ body: pizzaBodyValidation }), PizzaController.update)

routes.post('/size', auth, isAdmin, validation({ body: pizzaSizeBodyValidation }), PizzaSizeController.store)
routes.delete('/size/:pizza_id/:size_id', auth, isAdmin, PizzaSizeController.delete)

routes.post('/ingredient', auth, isAdmin, validation({ body: pizzaIngredientBodyValidation }), PizzaIngredientController.store)
routes.delete('/ingredient/:pizza_id/:ingredient_id', auth, isAdmin, PizzaIngredientController.delete)


routes.get('/size/:id', PizzaSizeController.index)
routes.get('/ingredient/:id', PizzaIngredientController.index)
routes.get('/', PizzaController.index)
routes.get('/:id', PizzaController.show)

export default routes