import { Router } from 'express';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { adaptRoute } from '../adapter/express-route.adapter';
import { makeCreatePizzaIngredientController } from '../factories/pizza-ingredient/create-pizza-ingredient.controller.factory';
import { pizzaIngredientBodyValidation } from '../../infra/yup/schemas/pizza-ingredient.schema';
import { makeDeletePizzaIngredientController } from '../factories/pizza-ingredient/delete-pizza-ingredient.controller.factory';

const routes = Router()

routes.post('/', auth, isAdmin, adaptRoute(makeCreatePizzaIngredientController(pizzaIngredientBodyValidation)))
routes.delete('/', auth, isAdmin, adaptRoute(makeDeletePizzaIngredientController(pizzaIngredientBodyValidation)))

export default routes