import { Router } from 'express';
import DeliverymanController from '../controller/DeliverymanController';
import { validation } from '../middleware/validation';
import { deliverymanBodyValidation } from '../schemas/orderRequestSchema';
import { loginBodyValidation } from '../schemas/loginSchema';

const routes = Router()

routes.post('/', validation({ body: deliverymanBodyValidation }), DeliverymanController.store)
routes.get('/', DeliverymanController.nearestDeliverymans)
routes.post('/login', validation({ body: loginBodyValidation }), DeliverymanController.login)

export default routes