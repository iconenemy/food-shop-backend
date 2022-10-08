import { DocTypeFromGeneric, DocumentDefinition, Types } from 'mongoose';
import jwt from 'jsonwebtoken'
import config from 'config'

import { IUser } from '../models/types/user.type';
import { IToken } from '../models/types/token.type'

import Token from '../models/Token.model';

class TokenService {
    
    generateToken (payload: DocumentDefinition<Pick<IUser, 'username' | '_id' | 'first_name'| 'last_name'>>) {
        const accessToken = jwt.sign(payload, config.get('accessTokenPrivateKey'), {expiresIn: `${config.get('accessTokenExpiresIn')}m`})
        const refreshToken = jwt.sign(payload, config.get('refreshTokenPrivateKey'), {expiresIn: `${config.get('refreshTokenExpiresIn')}d`})

        return {accessToken, refreshToken}
    }

    veriftyAccessToken (token: string)  {
        return jwt.verify(token, config.get<string>('accessTokenPrivateKey'))
    }

    veriftyRefreshToken (token: string)  {
        return jwt.verify(token, config.get<string>('refreshTokenPrivateKey'))
    }
    
    async createToken (user_id: Types.ObjectId) {
    return await Token.create({user_id})
    }


    async findTokenByUserId (user_id: any){
        return await Token.findOne({user_id: user_id})
    }

    async pushTokenByUserId (user_id: Types.ObjectId, token: string) {
        await Token.updateOne({user_id: user_id}, { $push: {refresh_token: token}})
    }

    async popTokenByUserId (user_id: Types.ObjectId) {
        await Token.updateOne({user_id: user_id}, { $pop: {refresh_token: -1}})
    }

    async findAndPullToken (user_id: Types.ObjectId, refresh_token: string) {
        await Token.updateOne({user_id: user_id},{ $pull: {refresh_token: refresh_token}})
    }
}

export default TokenService