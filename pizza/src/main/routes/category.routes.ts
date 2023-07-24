import { Router } from 'express';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { adaptRoute } from '../adapter/express-route.adapter';
import { makeCreateCategoryController } from '../factories/category/create-category.controller.factory';
import { categoryBodyValidation } from '../../infra/yup/schemas/category.schema';
import { makeFindCategoryByIdController } from '../factories/category/find-category-by-id.controller.factory';
import { makeGetAllCategoriesController } from '../factories/category/get-all-categories.controller.factory';
import { makeDeleteCategoryController } from '../factories/category/delete-category.controller.factory';
import { makeUpdateCategoryController } from '../factories/category/update-category.controller.factory';
import { makeFindPizzaByCategoryController } from '../factories/category/find-pizza-by-category.controller.factory';

const routes = Router()

routes.post('/', auth, isAdmin, adaptRoute(makeCreateCategoryController(categoryBodyValidation)))
routes.put('/:id', auth, isAdmin, adaptRoute(makeUpdateCategoryController(categoryBodyValidation)))
routes.delete('/:id', auth, isAdmin, adaptRoute(makeDeleteCategoryController()))
routes.get('/', adaptRoute(makeGetAllCategoriesController()))
routes.get('/:id', adaptRoute(makeFindCategoryByIdController()))
routes.get('/pizza/:id', adaptRoute(makeFindPizzaByCategoryController()))

export default routes