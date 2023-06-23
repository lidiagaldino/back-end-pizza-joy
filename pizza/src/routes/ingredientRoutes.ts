import { Router } from 'express';
import IngredientController from '../controllers/IngredientController';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { ingredientBodyValidation } from '../schemas/ingredientSchema';
import { validation } from '../middleware/validation';
import { ingredientExists } from '../middleware/ingredientExists';

const routes = Router()

routes.get('/', IngredientController.index)
routes.get('/:id', IngredientController.show)

routes.post('/', auth, isAdmin, validation({ body: ingredientBodyValidation }), IngredientController.store)
routes.put('/:id', auth, isAdmin, validation({ body: ingredientBodyValidation }), ingredientExists('params', 'id'), IngredientController.update)
routes.delete('/:id', auth, isAdmin, ingredientExists('params', 'id'), IngredientController.delete)

export default routes