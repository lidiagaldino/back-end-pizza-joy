import express, { Router } from 'express';
import { auth } from '../middleware/auth';
import { adaptRoute } from '../adapter/express-route.adapter';
import { makeCreatePaymenteIntentController } from '../factories/payment/payment-intent.controller.factory';
import { paymenttBodyValidation } from '../../infra/yup/schemas/payment.schema';
import { makeConfirmPaymentController } from '../factories/payment/confirm-payment.controller.factory';

const routes = Router()

routes.post('/create-checkout-session', express.json(), auth, adaptRoute(makeCreatePaymenteIntentController(paymenttBodyValidation)))
routes.post('/webhook', express.raw({ type: 'application/json' }), adaptRoute(makeConfirmPaymentController()));

export default routes