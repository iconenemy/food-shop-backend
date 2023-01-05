import { Router } from 'express';

import userController from '../../controllers/user.controller';
import { errorWrapper } from '../../middlewares/error.wrapper';
import { bodyValidator } from '../../middlewares/body.validator';
import { userSchema } from '../../models/validates/user.joi'

import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsStaff } from '../../middlewares/check.is.staff';


const router: Router = Router()

// api/user/get-all
router.get('/get-all', errorWrapper(userController.getAll.bind(userController)))

// api/user/:id/find
router.get('/:id/find', errorWrapper(userController.findById.bind(userController)))

// api/user/:id/delete
router.get('/:id/delete', errorWrapper(userController.delete.bind(userController)))

// api/user/create
router.post('/create', bodyValidator(userSchema), errorWrapper(userController.create.bind(userController)))

// api/user/:id/update
router.post('/:id/update', bodyValidator(userSchema), errorWrapper(userController.update.bind(userController)))

export default router;
