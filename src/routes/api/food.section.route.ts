import { Router } from 'express';

import foodSectionController from '../../controllers/food.section.controller';
import { errorWrapper } from '../../middlewares/error.wrapper';
import { bodyValidator } from '../../middlewares/body.validator';
import { foodSectionSchema } from '../../models/validates/food.section.joi'
import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsStaff } from '../../middlewares/check.is.staff';

const router: Router = Router()

// api/food-section/get-all
router.get('/get-all', errorWrapper(foodSectionController.getAll.bind(foodSectionController)))

// api/food-section/:id/find
router.get('/:id/find', errorWrapper(foodSectionController.findById.bind(foodSectionController)))

// api/food-section/:id/delete
router.get('/:id/delete', errorWrapper(foodSectionController.delete.bind(foodSectionController)))

// api/food-section/create
router.post('/create', bodyValidator(foodSectionSchema), errorWrapper(foodSectionController.create.bind(foodSectionController)))

// api/food-section/:id/update
router.post('/:id/update', bodyValidator(foodSectionSchema), errorWrapper(foodSectionController.update.bind(foodSectionController)))

export default router;
