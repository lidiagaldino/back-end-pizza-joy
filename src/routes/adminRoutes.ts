import { Router } from 'express'
import AdminController from '../controllers/AdminController'
import LoginController from '../controllers/LoginController'
import { auth } from '../middleware/auth'
import { validation } from '../middleware/validation'
import { verifyIfExists } from '../middleware/verifyIfExists'
import { adminBodyValidation } from '../schemas/adminSchema'
import { loginBodyValidation } from '../schemas/loginSchema'

const routes = Router()

routes.post('/', validation({ body: adminBodyValidation }), verifyIfExists('ADMIN'), AdminController.store)
routes.get('/', auth, AdminController.show)
routes.put('/', auth, validation({ body: adminBodyValidation }), AdminController.update)

routes.post('/login', validation({ body: loginBodyValidation }), LoginController.admin)

export default routes