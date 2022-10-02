import { DocumentDefinition, Types } from "mongoose";

import { IUser } from "../models/types/user.type";
import User from "../models/User.model";

export default class UserService {
    async createUser (data: DocumentDefinition<Omit<IUser, 'created_at' | 'updated_at'>>) {
        return await User.create(data)
    }

    async findUserByUsername (data: DocumentDefinition<Pick<IUser, 'username'>>) {
        return await User.findOne(data)
    }

    async findUserByEmail (data: DocumentDefinition<Pick<IUser, 'email'>>) {
        return await User.findOne(data)
    }

    async findUserByPhoneNumber (data: DocumentDefinition<Pick<IUser, 'phone_number'>>){
        return await User.findOne(data)
    }
}