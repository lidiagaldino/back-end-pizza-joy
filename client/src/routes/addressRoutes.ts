import { Router } from 'express'
import { auth } from '../middleware/auth'
import { validation } from '../middleware/validation'
import { addressBodyValidation } from '../schemas/addressSchema'
import AddressController from '../controllers/AddressController'

const routes = Router()

routes.post('/', auth, validation({ body: addressBodyValidation }), AddressController.store)
routes.put('/:id', auth, validation({ body: addressBodyValidation }), AddressController.update)
routes.get('/', auth, AddressController.index)
routes.get('/:id', AddressController.show)

export default routes