import { Router } from "express";
import { adaptRoute } from "../adapter/express-route.adapter";
import { makeGetAllSizesController } from "../factories/size/get-all-sizes.controller.factory";
import { makeFindSizeByIdController } from "../factories/size/find-size-by-id.controller.factory";
import { isAdmin } from "../middleware/isAdmin";
import { auth } from "../middleware/auth";
import { makeCreateSizeController } from "../factories/size/create-size.controller.factory";
import { sizeBodyValidation } from "../../infra/yup/schemas/size.schema";
import { makeUpdateSizeController } from "../factories/size/update-size.controller.factory";
import { makeDeleteSizeController } from "../factories/size/delete-size.controller.factory";


const routes = Router()

routes.get('/', adaptRoute(makeGetAllSizesController()))
routes.get('/:id', adaptRoute(makeFindSizeByIdController()))

routes.post('/', auth, isAdmin, adaptRoute(makeCreateSizeController(sizeBodyValidation)))
routes.put('/:id', auth, isAdmin, adaptRoute(makeUpdateSizeController(sizeBodyValidation)))
routes.delete('/:id', auth, isAdmin, adaptRoute(makeDeleteSizeController()))

export default routes
