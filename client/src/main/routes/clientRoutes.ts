import { Router } from 'express'
import { auth } from '../middleware/auth'
import { adaptRoute } from '../adapter/express-route.adapter'
import { makeCreateClientController } from '../factories/client/create-client.controller.factory'
import { clientBodyValidation } from '../../infra/yup/schemas/client.schema'
import { makeUpdateClientController } from '../factories/client/update-client.controller.factory'
import { makeLoginClientControlelr } from '../factories/client/login-client.controller.factory'
import { loginBodyValidation } from '../../infra/yup/schemas/loginSchema'
import { makeGetClientByTokenId } from '../factories/client/get-client-token-id.controller.factory'

const routes = Router()

routes.post('/', adaptRoute(makeCreateClientController(clientBodyValidation)))
routes.get('/', auth, adaptRoute(makeGetClientByTokenId()))
routes.put('/', auth, adaptRoute(makeUpdateClientController(clientBodyValidation)))

routes.post('/login', adaptRoute(makeLoginClientControlelr(loginBodyValidation)))

export default routes