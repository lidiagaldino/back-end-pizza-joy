import { Router } from 'express'
import PizzaController from '../../controllers/PizzaController'

const routes = Router()

routes.get('/', PizzaController.index)
routes.get('/:id', PizzaController.show)

export default routes