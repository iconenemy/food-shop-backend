import { Model, model, Schema } from 'mongoose';

import { IToken } from './types/token.type';

const tokenSchema: Schema<IToken> = new Schema({
    user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
    },
    refresh_token: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        require: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
        require: true
    }
  }, {
    versionKey: false
  });
  
  const Token: Model<IToken> = model<IToken>('Token', tokenSchema)
  
  export default Token;