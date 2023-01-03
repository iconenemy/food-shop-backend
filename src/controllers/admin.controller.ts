import { Request, Response } from 'express'
import { Types, Document } from 'mongoose';

import ModelService from '../services/model.service';
import UserService from '../services/user.service';
import FoodSectionService from '../services/food.section.service'; 
import FoodItem from '../models/Food.Item.model';
import { IUser } from '../models/types/user.type';
import { IFoodSection } from '../models/types/food.section.type'; 
import { IFoodItem } from '../models/types/food.item.type';
import { TypedRequestBodyParams } from '../utils/req.body.params.types';


import FoodItemService from '../services/food.item.service';
import PasswordService from '../services/password.service';
import fileUpload, { FileArray, UploadedFile } from 'express-fileupload';

export interface IRequestData extends Document {
    user?: IUser,
    food_section?: IFoodSection,
    food_item?: IFoodItem,
    file?: fileUpload.FileArray | null
}

class AdminController  {

    constructor (private ModelService: ModelService,
                 private UserService: UserService,
                 private FoodSectionSerive: FoodSectionService,
                 private FoodItemService: FoodItemService,
                 private PasswordService: PasswordService) {}

    async getModels(req: Request, res: Response){
        const _modelList: Array<string> = this.ModelService.getModelNames()
        
        // Doesn't retrieve Token collection due to access restrictions
        const modelList = _modelList.filter(item => item !== 'Token')
        
        return res.status(200).json({
            status: 200,
            modelList
        })
    }

    async getKeys(req: Request<{model: string}>, res: Response){
        const { model } = req.params
        
        let modelKeys: Array<string> = []

        if (model === 'User') {
            modelKeys = this.ModelService.getUserKeys()

        } else if (model === 'FoodSection') {
            modelKeys = this.ModelService.getFoodSectionKeys()

        } else if (model === 'FoodItem') {
            modelKeys = this.ModelService.getFoodItemKeys()

        } else {
            return res.status(404).json({
                status: 404,
                message: 'Not found'
            })
        }

        return res.status(200).json({
            status: 200,
            modelKeys
        })
    }

    async getAll (req: Request<{model: string}>, res: Response) {
        const { model } = req.params
        
        let docList: Object = {}

        if (model === 'User') {
            docList = await this.UserService.getAll()
        
        } else if (model === 'FoodSection') {
            docList = await this.FoodSectionSerive.getAll()
        
        } else if (model === 'FoodItem') {
            docList = await this.FoodItemService.getAll()

        } else {
            return res.status(404).json({
                status: 404,
                message: 'Not found'
            })
        }
        
        return res.status(200).json({ 
            status: 200, 
            docList
        })
        
    }

    async delete (req: Request<{model: string, id: Types.ObjectId}>, res: Response) {
        const { model, id } = req.params
        
        if (model === 'User') {
            await this.UserService.deleteUserById(id)
        
        } else if (model === 'FoodSection'){
            await this.FoodSectionSerive.deleteById(id)
        
        } else if (model === 'FoodItem') {
            await this.FoodItemService.deleteById(id)

        } else {
            return res.status(404).json({message: 'Not found'})
        }

        return res.status(200).json({
            message: `${model} ${id} has been delete`,
            status: 200
        })

    }

    async findOneById (req: Request<{model: string, id: Types.ObjectId}>, res: Response) {
        const {model, id} = req.params

        if (model === 'User') {
            const list  = await this.UserService.findUserById(id)
            return res.status(200).json({ list })
        
        } else if (model === 'FoodSection') {
            const list  = await this.FoodSectionSerive.findById(id)
            return res.status(200).json({ list })
        
        } else if (model === 'FoodItem') {
            const list  = await this.FoodItemService.findById(id)
            return res.status(200).json({ list })
        
        } else {
            return res.status(404).json({
                status: 404, 
                message: `${model} with such such id ${id} does not exist`
            })
        }
    }

    async create (req: Request, res: Response){
        const { model} = req.params

        if (model === 'FoodSection') {
            const name: string = req.body?.food_section?.name as string
            const is_available: boolean = req.body?.food_section?.is_available as boolean
            const ordering_priority: number = req.body?.food_section?.ordering_priority as number
            const image: string = req.body?.food_section?.image as string
           
            await this.FoodSectionSerive.create({name, is_available, ordering_priority, image})
        
        } else if (model === 'FoodItem') {
            if (!req.files) return res.status(400).json({
                status: 400,
                message: "No file uploaded"
            })

            const { file } = req.files
            const imageFile: UploadedFile = file as UploadedFile

            imageFile.name = encodeURI(imageFile.name.replace(/\s/g, ''))
            const image = `images/${imageFile.name}`
            
            const name: String = req.body?.name as String
            const food_section: Types.ObjectId = req.body?.food_section as Types.ObjectId
            const is_available: boolean = req.body?.is_available as boolean
            const ordering_priority: Number = req.body?.ordering_priority as number
            const price: Types.Decimal128 = req.body?.price as Types.Decimal128
           
            await this.FoodItemService.create({name, food_section, is_available, ordering_priority, image, price})

            imageFile.mv(`${__dirname}\\..\\..\\..\\food-shop-frontend\\public\\images\\${imageFile.name}`, err => {
                if (err) {
                    return res.status(500).json(err)
                }
            })
        }

        res.status(201).json({
            status: 201,
            message: `${model} has been create`
       })
        
    }

    async update (req: TypedRequestBodyParams<{model: string, id: Types.ObjectId}, IRequestData>, res: Response) {
        const { model, id} = req.params

        if (model === 'User') {
            const username: string = req.body?.user?.username as string
            const email: string = req.body?.user?.email as string
            const first_name: string = req.body?.user?.first_name as string
            const last_name: string = req.body?.user?.last_name as string
            const password: string = req.body?.user?.password as string
            const phone_number: string = req.body?.user?.phone_number as string
            const age: number = req.body?.user?.age as number
            const is_staff: boolean = req.body?.user?.is_staff as boolean
            const is_active: boolean = req.body?.user?.is_active as boolean
            
            const hashPassword = await this.PasswordService.hashPassword(password)

            await this.UserService.updateUserById(id, {username, email, first_name, last_name, password: hashPassword, phone_number, age, is_active, is_staff})
        
        } else if (model === 'FoodSection') {
            const name: string = req.body?.food_section?.name as string
            const is_available: boolean = req.body?.food_section?.is_available as boolean
            const ordering_priority: number = req.body?.food_section?.ordering_priority as number
            const image: string = req.body?.food_section?.image as string

            await this.FoodSectionSerive.updateById(id, {name, is_available, ordering_priority, image} )  
        
        } else if (model === 'FoodItem') {
            
            const name: string = req.body?.food_item?.name as string
            const food_section: Types.ObjectId = req.body?.food_item?.food_section as Types.ObjectId
            const ordering_priority: number = req.body?.food_item?.ordering_priority as number
            const is_available: boolean = req.body?.food_item?.is_available as boolean
            const image: string = req.body?.food_item?.image as string
            const price: Types.Decimal128 = req.body?.food_item?.price as Types.Decimal128

            await this.FoodItemService.updateById(id, {name, food_section, ordering_priority, is_available, image, price} )  
        }
        
        res.status(200).json({
            status: 200,
            message: `${model} has been update`
        })
    }

}

export default new AdminController(new ModelService, new UserService, new FoodSectionService, new FoodItemService, new PasswordService)
