import { DocumentDefinition, Types } from "mongoose";

import { IFoodItem } from "../models/types/food.item.type"; 
import FoodItem from "../models/Food.Item.model"; 

export default class FoodItemService {
    async create(data: DocumentDefinition<IFoodItem>) {
        return await FoodItem.create(data)
    }

    async deleteById(id: Types.ObjectId) {
        return await FoodItem.findByIdAndDelete(id)
    }

    async updateById(id: Types.ObjectId, updateData: DocumentDefinition<IFoodItem>) {
        return await FoodItem.findByIdAndUpdate(id, {
            name: updateData.name,
            food_section: updateData.food_section, 
            ordering_priority: updateData.ordering_priority,
            is_available: updateData.is_available,
            image: updateData.image,
            price: updateData.price
        })
    }

    async getAll(){
        return await FoodItem.find()
    }

    async findById(id: Types.ObjectId) {
        return await FoodItem.findById(id)
    }

    async getListByFoodSection(section: Types.ObjectId) {
        return await FoodItem.find({food_section: section})
    }

    async findByName(name: DocumentDefinition<Pick<IFoodItem, "name">>) {
        return await FoodItem.findOne(name)
    }
}