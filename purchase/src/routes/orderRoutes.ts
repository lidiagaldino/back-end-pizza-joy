import { Router } from 'express';
import { auth } from '../middleware/auth';
import { isClient } from '../middleware/isClient';
import StripeController from '../controllers/StripeController';

const routes = Router()

routes.get('/', auth, isClient, StripeController.getByClient)

//Rotas para atualizar pedido 
//(pronto para entrega)
//(a caminho)
//(finalizado)

export default routes