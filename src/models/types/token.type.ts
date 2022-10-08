import { Document, Types } from 'mongoose';

export interface IToken extends Document {
    user_id: Types.ObjectId;
    refresh_token: [String];
}