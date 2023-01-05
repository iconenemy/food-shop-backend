import { Request, Response } from 'express'
import { Types } from 'mongoose';
import {  UploadedFile } from 'express-fileupload';
 
import FoodItemService from '../services/food.item.service';
import { IFoodItem } from '../models/types/food.item.type';
import { TypedRequestBody } from '../utils/req.body.type';
import { TypedRequestBodyParams } from '../utils/req.body.params.types';

class FoodSectionController {

    constructor (private FoodItemService: FoodItemService) {}

    async getAll(req: Request, res: Response){
        const docList: IFoodItem[] = await this.FoodItemService.getAll()
    
        return res.status(200).json({ 
            status: 200, 
            docList
        })
    }

    async delete (req: Request<{id: Types.ObjectId}>, res: Response) {
        const { id } = req.params

        await this.FoodItemService.deleteById(id)

        return res.status(200).json({
            message: `${id} has been delete`,
            status: 200
        })
    }

    async findById (req: Request<{id: Types.ObjectId}>, res: Response){
        const { id } = req.params

        const item: IFoodItem  = await this.FoodItemService.findById(id) as IFoodItem
        
        return res.status(200).json({ 
            status: 200,
            item 
        })
       
    }

    async create (req: Request, res: Response){
        const { image, name } = req.body
        console.log(image, name);
        if (!req.files) return res.status(400).json({
            status: 400,
            message: "No file uploaded"
        })
        
        const { file } = req.files
        const imageFile: UploadedFile = file as UploadedFile

        imageFile.name = encodeURI(imageFile.name.replace(/\s/g, ''))
        const imagePath = `images/${imageFile.name}`
    
        await this.FoodItemService.create({...req.body, image: imagePath})
    
        imageFile.mv(`${__dirname}\\..\\..\\..\\food-shop-frontend\\public\\images\\${imageFile.name}`, err => {
            if (err) {
                return res.status(500).json(err)
            }
        })

        return res.status(201).json({
            status: 201,
            message: `FoodItem has been create`
        })
    }   

    async update (req: TypedRequestBodyParams<{id: Types.ObjectId}, IFoodItem>, res: Response){
        const { id } = req.params
        
        await this.FoodItemService.updateById(id, {...req.body} )  
    
        res.status(200).json({
            status: 200,
            message: `${id} has been update`
        })

    }  
}

export default new FoodSectionController (new FoodItemService)
