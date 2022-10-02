import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

export const bodyValidator = (schema: Joi.AnySchema) => 
    async (req: Request, res: Response, next: NextFunction) =>
        await schema.validateAsync(req.body) ? next() : res.status(400).json({message: 'Data with such fields do not exist'})