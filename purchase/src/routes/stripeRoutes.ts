import express, { Router } from 'express';
import StripeController from '../controllers/StripeController';
import { auth } from '../middleware/auth';
import { isClient } from '../middleware/isClient';

const routes = Router()

routes.post('/create-checkout-session', express.json(), auth, isClient, StripeController.createIntent)
routes.post('/webhook', express.raw({ type: 'application/json' }), StripeController.confirmPayment);

export default routes