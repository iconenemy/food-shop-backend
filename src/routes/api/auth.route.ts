import { Router } from 'express';

import { bodyValidator } from '../../middlewares/body.validator'
import { userSchema } from '../../models/validates/user.joi'
import { errorWrapper } from '../../middlewares/error.wrapper';
import userController from '../../controllers/auth.controller';
import { checkJWT } from '../../middlewares/check.jwt';

const router: Router = Router()

// api/auth/register
router.post('/register', errorWrapper(bodyValidator(userSchema)), errorWrapper(userController.register.bind(userController)))

// api/auth/login
router.post('/login', errorWrapper(bodyValidator(userSchema)), errorWrapper(userController.login.bind(userController)))

// api/auth/logout
router.post('/logout', errorWrapper(userController.logout.bind(userController)))

// api/auth/refresh
router.post('/refresh', errorWrapper(userController.refresh.bind(userController)))

router.get('/getAll', checkJWT, errorWrapper(userController.getAll.bind(userController)))

export default router;