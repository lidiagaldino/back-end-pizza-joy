import express, { Router } from 'express';
import StripeController from '../controllers/StripeController';

const routes = Router()

routes.post('/create-checkout-session', express.json(), StripeController.createIntent)
routes.post('/webhook', express.raw({ type: 'application/json' }), StripeController.confirmPayment);

export default routes