import { Router } from "express";
import SizeController from "../controllers/SizeController";
import { auth } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { validation } from "../middleware/validation";
import { sizeBodyValidation } from "../schemas/sizeSchema";
import { sizeExists } from "../middleware/sizeExists";

const routes = Router()

routes.get('/', SizeController.index)
routes.get('/:id', SizeController.show)

routes.post('/', auth, isAdmin, validation({ body: sizeBodyValidation }), SizeController.store)
routes.put('/:id', auth, isAdmin, validation({ body: sizeBodyValidation }), sizeExists('params', 'id'), SizeController.update)
routes.delete('/:id', auth, isAdmin, sizeExists('params', 'id'), SizeController.delete)

export default routes
