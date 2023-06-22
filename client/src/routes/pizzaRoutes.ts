import { Router } from 'express'
import { auth } from '../middleware/auth'
import PizzaController from '../controllers/PizzaController'

const routes = Router()


export default routes