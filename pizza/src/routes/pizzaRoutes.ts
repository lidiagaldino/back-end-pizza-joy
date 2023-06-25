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
import { sizeExists } from "../middleware/sizeExists";
import { ingredientExists } from "../middleware/ingredientExists";
import { pizzaExists } from "../middleware/pizzaExists";
import { categoryExists } from "../middleware/categoryExists";

const routes = Router()

routes.post('/', auth, isAdmin, validation({ body: pizzaBodyValidation }), ingredientExists('body', 'ingredient'), sizeExists('body', 'size'), categoryExists('body', 'category_id'), PizzaController.store)
routes.put('/:id', auth, isAdmin, validation({ body: pizzaBodyValidation }), pizzaExists('params', 'id'), categoryExists('body', 'category_id'), PizzaController.update)

routes.post('/size', auth, isAdmin, validation({ body: pizzaSizeBodyValidation }), sizeExists('body', 'size_id'), pizzaExists('body', 'pizza_id'), PizzaSizeController.store)
routes.delete('/size/:pizza_id/:size_id', auth, isAdmin, sizeExists('params', 'size_id'), pizzaExists('params', 'pizza_id'), PizzaSizeController.delete)

routes.post('/ingredient', auth, isAdmin, validation({ body: pizzaIngredientBodyValidation }), ingredientExists('body', 'ingredient_id'), pizzaExists('body', 'id_pizza'), PizzaIngredientController.store)
routes.delete('/ingredient/:pizza_id/:id_ingredient', auth, isAdmin, ingredientExists('params', 'id_ingredient'), pizzaExists('params', 'pizza_id'), PizzaIngredientController.delete)


routes.get('/size/:id', PizzaSizeController.index)
routes.get('/ingredient/:id', PizzaIngredientController.index)
routes.get('/', PizzaController.index)
routes.get('/:id', PizzaController.show)

export default routes