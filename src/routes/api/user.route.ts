import { Router } from 'express';

import { bodyValidator } from '../../middlewares/body.validator'
import { userSchema } from '../../models/validates/user.joi'
import { errorWrapper } from '../../middlewares/error.wrapper';
import userController from '../../controllers/user.controller';

const router: Router = Router()

// api/user/register
router.post('/register', errorWrapper(bodyValidator(userSchema)), errorWrapper(userController.registerUser.bind(userController)))

// api/user/login
router.post('/login', errorWrapper(bodyValidator(userSchema)), errorWrapper(userController.loginUser.bind(userController)))

export default router;