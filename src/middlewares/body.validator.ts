import Joi, { object } from 'joi'
import { Request, Response, NextFunction } from 'express'

export const bodyValidator = (schema: Joi.AnySchema) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const {value, error} = schema.validate(req.body, {abortEarly: false})
        console.log();
        
        console.log(error?.details.map(item => console.log('Message:', item.message, 'Path:', item.path, 'Context:', item.context)));
        
        
        
        return error == null ? next() : res.status(455).json(error?.details[0])
    }
       