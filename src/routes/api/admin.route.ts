import { Router } from 'express';

import adminController from "../../controllers/admin.controller";
import { errorWrapper } from '../../middlewares/error.wrapper';
import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsStaff } from '../../middlewares/check.is.staff';


const router: Router = Router()

// api/admin/models
router.get('/models', checkJWT, checkIsStaff, errorWrapper(adminController.getModels.bind(adminController)))

// api/admin/:model/keys
router.get('/:model/keys', checkJWT, checkIsStaff, errorWrapper(adminController.getKeys.bind(adminController)))

// api/admin/:model
router.get('/:model', checkJWT, checkIsStaff, errorWrapper(adminController.getAll.bind(adminController))) 

// api/admin/:model/create
router.post('/:model/create', checkJWT, checkIsStaff, errorWrapper(adminController.create.bind(adminController)))

// api/admin/:model/:id/update
router.post('/:model/:id/update', checkJWT, checkIsStaff, errorWrapper(adminController.update.bind(adminController)))

// api/admin/:model/:id/find
router.get('/:model/:id/find', checkJWT, checkIsStaff, errorWrapper(adminController.findOneById.bind(adminController)))

// api/admin/:model/:id/delete
router.get('/:model/:id/delete', checkJWT, checkIsStaff, errorWrapper(adminController.delete.bind(adminController)))

export default router;
