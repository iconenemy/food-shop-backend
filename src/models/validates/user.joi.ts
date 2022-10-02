import Joi from 'joi';
import { IUser } from '../types/user.type';

export const userSchema = Joi.object<IUser>({
    username: Joi.string().lowercase().min(6).max(12).required(),
    email: Joi.string().email(),
    password: Joi.string().min(5).max(20).required(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    age: Joi.number().greater(10),
    phone_number: Joi.string().pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    is_staff: Joi.boolean,
    is_active: Joi.boolean()
})