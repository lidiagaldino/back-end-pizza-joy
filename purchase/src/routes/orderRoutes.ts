import { Router } from 'express';
import { auth } from '../middleware/auth';
import { isClient } from '../middleware/isClient';
import StripeController from '../controllers/StripeController';
import { orderStatusBodyValidation } from '../schemas/orderStatusSchema';
import { validation } from '../middleware/validation';

const routes = Router()

routes.get('/', auth, isClient, StripeController.getByClient)
routes.get('/status/:id', auth, StripeController.getOrderByStatus)

routes.put('/status/:id', auth, validation({ body: orderStatusBodyValidation }), StripeController.updateStatus)

//Rotas para atualizar pedido  
//(pronto para entrega)
//(a caminho)
//(finalizado)

export default routes