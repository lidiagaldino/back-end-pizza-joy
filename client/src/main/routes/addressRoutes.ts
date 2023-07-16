import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addressBodyValidation } from '../../infra/yup/schemas/address.schema'
import { adaptRoute } from '../adapter/express-route.adapter'
import { makeCreateAddressController } from '../factories/address/create-address.controller.factory'
import { makeUpdateAddressController } from '../factories/address/update-address.controller.factory'
import { makeFindAddressByIdController } from '../factories/address/find-address-by-id.controller.factory'
import { makeSearchAddressByIdController } from '../factories/address/search-address-by-client.controller.factory'

const routes = Router()

routes.post('/', auth, adaptRoute(makeCreateAddressController(addressBodyValidation)))
routes.put('/:id', auth, adaptRoute(makeUpdateAddressController(addressBodyValidation)))
routes.get('/', auth, adaptRoute(makeSearchAddressByIdController()))
routes.get('/:id', adaptRoute(makeFindAddressByIdController()))

export default routes