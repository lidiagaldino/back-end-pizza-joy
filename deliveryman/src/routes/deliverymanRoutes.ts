import { Router } from 'express';
import DeliverymanController from '../controller/DeliverymanController';
import { validation } from '../middleware/validation';
import { deliverymanBodyValidation } from '../schemas/orderRequestSchema';

const routes = Router()

routes.post('/', validation({ body: deliverymanBodyValidation }), DeliverymanController.store)
routes.get('/', DeliverymanController.nearestDeliverymans)

export default routes