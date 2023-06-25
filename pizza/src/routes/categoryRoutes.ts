import { Router } from 'express';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { categoryBodyValidation } from '../schemas/categorySchema';
import { validation } from '../middleware/validation';
import CategoryController from '../controllers/CategoryController';

const routes = Router()

routes.post('/', auth, isAdmin, validation({ body: categoryBodyValidation }), CategoryController.store)
routes.put('/:id', auth, isAdmin, validation({ body: categoryBodyValidation }), CategoryController.update)
routes.get('/', CategoryController.index)
routes.get('/:id', CategoryController.show)

export default routes