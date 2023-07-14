import { Router } from 'express'
import { makeCreateAdminController } from '../factories/create-admin-controller.factory'
import { adaptRoute } from '../adapter/express-router.adapter'
import { makeUpdateAdminController } from '../factories/update-admin.controller.factory'
import { auth } from '../middleware/auth'
import { makeLoginAdminController } from '../factories/login-admin.controller.factory'
import { makeGetAdminDataController } from '../factories/get-admin-data.controller.factory'
import { adminBodyValidation } from '../../infra/yup/schemas/adminSchema'

const routes = Router()

routes.post('/', adaptRoute(makeCreateAdminController(adminBodyValidation)))
routes.put('/', auth, adaptRoute(makeUpdateAdminController(adminBodyValidation)))
routes.post('/login', adaptRoute(makeLoginAdminController()))
routes.get('/:id', auth, adaptRoute(makeGetAdminDataController()))


export default routes