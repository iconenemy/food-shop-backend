import { CookieOptions, Request, Response } from 'express';
import config from 'config'

import UserService from '../services/user.service';
import PasswordService from '../services/password.service';
import TokenService from '../services/token.service';

import { TypedRequestBody } from '../utils/req.body.type'
import { IUser } from '../models/types/user.type'

class UserController {
    constructor(private UserService: UserService, 
                private PasswordService: PasswordService, 
                private TokenService: TokenService) {}

    async registerUser (req: TypedRequestBody<IUser>, res: Response) {
        const {username, email, password, phone_number} = req.body

        const candidateByUsername = await this.UserService.findUserByUsername({username})
        if (candidateByUsername) return res.status(409).json({msg: `This username has already used`})

        const candidateByEmail = await this.UserService.findUserByEmail({email})
        if (candidateByEmail) return res.status(409).json({msg: `This email has already used`})

        const candidateByPhoneNumber = await this.UserService.findUserByPhoneNumber({phone_number})
        if (candidateByPhoneNumber) return res.status(409).json({msg: `This phone number has already used`})

        const hashPassword = await this.PasswordService.hashPassword(password)

        const newUser = await this.UserService.createUser({...req.body, password: hashPassword})
        await newUser.save()

        res.status(200).json({
            msg: 'User has been created',
            username: newUser.username,
            email: newUser.email
        })
    } 
    
    async loginUser (req: TypedRequestBody<IUser>, res: Response) {
        const { username, password } = req.body

        const candidate = await this.UserService.findUserByUsername({username})
        if (!candidate) return res.status(409).json({msg: `Incorrect data. Try it again`})

        const isMatchPassword = await this.PasswordService.comparePassword(password, candidate.password)
        if (!isMatchPassword) return res.status(409).json({msg: `Incorrect data. Try it again`})

        const payload = {
            _id: candidate._id,
            username: candidate.username,
            first_name: candidate.first_name,
            last_name: candidate.last_name
        }

        const {accessToken, refreshToken} = this.TokenService.generateToken(payload)
        
        const newToken = await this.TokenService.createToken({user_id: candidate._id, refresh_token: refreshToken})
        await newToken.save()

        const cookieOptions : CookieOptions = {
            expires: new Date (
                Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
            ),
            maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
            httpOnly: true
        }

        res.cookie('refresh_token', refreshToken, cookieOptions)

        res.status(200).json({
            accessToken,
            refreshToken
        })
    }
}

export default new UserController(new UserService, new PasswordService, new TokenService)