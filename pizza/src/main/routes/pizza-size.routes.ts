import { Router } from 'express';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { adaptRoute } from '../adapter/express-route.adapter';
import { makeCreatePizzaSizeController } from '../factories/pizza-size/create-pizza-size.controller.factory';
import { pizzaSizeBodyValidation } from '../../infra/yup/schemas/pizza-size.schema';
import { makeDeletePizzaSizeController } from '../factories/pizza-size/delete-pizza-size.controller.factory';
import { makeFindPizzaBySizeController } from '../factories/pizza-size/find-pizza-by-size.controller.factory';

const routes = Router()

routes.post('/', auth, isAdmin, adaptRoute(makeCreatePizzaSizeController(pizzaSizeBodyValidation)))
routes.delete('/', auth, isAdmin, adaptRoute(makeDeletePizzaSizeController(pizzaSizeBodyValidation)))
routes.get('/:id', adaptRoute(makeFindPizzaBySizeController()))

export default routes