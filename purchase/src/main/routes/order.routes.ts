import { Router } from 'express';
import { auth } from '../middleware/auth';
import { isClient } from '../middleware/isClient';
import { adaptRoute } from '../adapter/express-route.adapter';
import { makeFindOrderByClientController } from '../factories/order/find-order-by-client.controller.factory';
import { makeUpdateOrderStatusController } from '../factories/order/update-order-status.controller.factory';
import { orderStatusBodyValidation } from '../../infra/yup/schemas/order-status.schema';

const routes = Router()

routes.get('/', auth, isClient, adaptRoute(makeFindOrderByClientController()))
routes.put('/status/:id', auth, adaptRoute(makeUpdateOrderStatusController(orderStatusBodyValidation)))

//Rotas para atualizar pedido  
//(pronto para entrega)
//(a caminho)
//(finalizado)

export default routes