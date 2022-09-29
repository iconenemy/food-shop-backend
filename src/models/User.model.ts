import { Model, model, Schema } from 'mongoose';

import { IUser } from './types/user.type';

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
        unique: true
    },
    last_name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    is_staff: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    }
})

const User: Model<IUser> = model<IUser>('User', userSchema)

export default User;