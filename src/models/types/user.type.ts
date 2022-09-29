import { Document, Types} from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    created_at?: Date;
    updated_at?: Date;
    is_staff?: boolean;
    is_active?: boolean;
}