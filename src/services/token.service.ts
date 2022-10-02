import { DocumentDefinition } from 'mongoose';
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
    
    async createToken (data: DocumentDefinition<Omit<IToken, 'created_at' | 'updated_at'>>) {
        return await Token.create(data)
    }

}

export default TokenService