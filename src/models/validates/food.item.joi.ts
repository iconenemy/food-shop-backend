import Joi from 'joi';
import { IFoodItem } from '../types/food.item.type'; 

export const foodItemSchema = Joi.object<IFoodItem>({
    name: Joi.string().min(4).max(20).required().messages({
        'string.base': 'Name name should be a type of text',
        'string.empty': 'Name name cannot be an empty field',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 20',
        'string.required': 'Name is a required field'
    }),
    ordering_priority: Joi.number().greater(0).required().messages({
        'number.base': 'Ordering priority should be a type of number',
        'number.empty': 'Ordering priority cannot be an empty field',
        'number.greater': 'Ordering priority should be greater than 0',
    }),
    is_available: Joi.boolean(),
    price: Joi.required(),
    food_section: Joi.required(),
    image: Joi.string().required()
})