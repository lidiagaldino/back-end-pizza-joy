import { Router } from 'express';
import { adaptRoute } from '../adapter/express-route.adapter';
import { makeGetAllIngredientsController } from '../factories/ingredient/get-all-ingredients.controller.factory';
import { makeFindIngredientByIdController } from '../factories/ingredient/find-ingredient-by-id.controller.factory';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { makeCreateIngredientController } from '../factories/ingredient/create-ingredient.controller.factory';
import { ingredientBodyValidation } from '../../infra/yup/schemas/ingredient.schema';
import { makeUpdateIngredientController } from '../factories/ingredient/update-ingredient.controller.factory';
import { makeDeleteIngredientController } from '../factories/ingredient/delete-ingredient.controller.factory';


const routes = Router()

routes.get('/', adaptRoute(makeGetAllIngredientsController()))
routes.get('/:id', adaptRoute(makeFindIngredientByIdController()))

routes.post('/', auth, isAdmin, adaptRoute(makeCreateIngredientController(ingredientBodyValidation)))
routes.put('/:id', auth, isAdmin, adaptRoute(makeUpdateIngredientController(ingredientBodyValidation)))
routes.delete('/:id', auth, isAdmin, adaptRoute(makeDeleteIngredientController()))

export default routes