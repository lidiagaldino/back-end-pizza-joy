import { Router } from 'express'
import ClientController from '../controllers/ClientController'
import LoginController from '../controllers/LoginController'
import { auth } from '../middleware/auth'
import { validation } from '../middleware/validation'
import { verifyIfExists } from '../middleware/verifyIfExists'
import { clientRegisterBodyValidation } from '../schemas/clientRegisterSchema'
import { clientBodyValidation } from '../schemas/clientSchema'
import { loginBodyValidation } from '../schemas/loginSchema'

const routes = Router()

routes.post('/', validation({ body: clientRegisterBodyValidation }), verifyIfExists, ClientController.store)
routes.get('/', auth, ClientController.show)
routes.put('/', auth, validation({ body: clientBodyValidation }), ClientController.update)

routes.post('/login', validation({ body: loginBodyValidation }), LoginController.client)

export default routes