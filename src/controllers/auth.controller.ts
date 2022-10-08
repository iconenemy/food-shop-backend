import { CookieOptions, Request, Response } from 'express';
import config from 'config'

import UserService from '../services/user.service';
import PasswordService from '../services/password.service';
import TokenService from '../services/token.service';

import { TypedRequestBody } from '../utils/req.body.type'
import { IUser } from '../models/types/user.type'
import { Types } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

class AuthController {
    constructor(private UserService: UserService, 
                private PasswordService: PasswordService, 
                private TokenService: TokenService) {}

    async register (req: TypedRequestBody<IUser>, res: Response) {
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

        return res.status(200).json({
            msg: 'User has been created',
            username: newUser.username,
            email: newUser.email
        })
    } 
    
    async login (req: TypedRequestBody<IUser>, res: Response) {
        const { username, password } = req.body

        const candidate = await this.UserService.findUserByUsername({username})
        if (!candidate) return res.status(409).json({msg: `Incorrect data. Try it again`})

        const isMatchPassword = await this.PasswordService.comparePassword(password, candidate.password)
        if (!isMatchPassword) return res.status(409).json({msg: `Incorrect data. Try it again`})

        const payload = {
            _id: candidate._id as Types.ObjectId,
            username: candidate.username,
            first_name: candidate.first_name,
            last_name: candidate.last_name
        }

        const {accessToken, refreshToken} = this.TokenService.generateToken(payload)
        
        const tokenCandidate = await this.TokenService.findTokenByUserId(payload._id)
        if (tokenCandidate ) {
            if (tokenCandidate.refresh_token.length > 3) {
                await this.TokenService.popTokenByUserId(tokenCandidate.user_id)
            } 
            await this.TokenService.pushTokenByUserId(tokenCandidate.user_id, refreshToken)
        } else {
            const newtoken = await this.TokenService.createToken(candidate._id)
            await newtoken.save()
            await this.TokenService.pushTokenByUserId(newtoken.user_id, refreshToken)
        }

        const cookieOptions : CookieOptions = {
            expires: new Date (
                Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
            ),
            maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
            httpOnly: true
        }

        res.cookie('refresh_token', refreshToken, cookieOptions)
        res.cookie('logged_in', true, {
            ...cookieOptions, 
            httpOnly: true, 
            maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000
        })

        return res.status(200).json({
            msg: 'Success',
            accessToken,
            refreshToken
        })
    }

    async logout (req: Request, res: Response) {
        const { refresh_token } = req.cookies
        if (!refresh_token) return res.status(403).json({
            msg: 'The client does not have access rights to the content'
        })

        const { _id } = this.TokenService.veriftyRefreshToken(refresh_token) as JwtPayload

        await this.TokenService.findAndPullToken(_id, refresh_token)

        res.clearCookie('refresh_token')
        res.cookie('logged_in', false, {
              maxAge: 1 
        })

        return res.status(200).json({
            msg: 'success logout'
        })
    }

    async refresh (req: Request, res: Response) {
        const { refresh_token } = req.cookies 
        
        const { _id } = this.TokenService.veriftyRefreshToken(refresh_token) as JwtPayload
        if (!_id) return res.status(403).json({msg: 'Forbidden decoded'})
    
        const token = await this.TokenService.findTokenByUserId(_id)
        if (!token) return res.status(403).json({msg: 'Forbidden session'})
        
        const user = await this.UserService.findUserById(_id)
        if (!user) return res.status(403).json({msg: 'Forbidden user'})

        await this.TokenService.findAndPullToken(_id, refresh_token)

        res.clearCookie('refresh_token')
        res.cookie('logged_in', false, {
              maxAge: 1 
        })

        const payload = {
            _id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name
        }

        const {accessToken, refreshToken} = this.TokenService.generateToken(payload)
        
        await this.TokenService.pushTokenByUserId(payload._id, refreshToken)

        const cookieOptions : CookieOptions = {
            expires: new Date (
                Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
            ),
            maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
            httpOnly: true
        }

        res.cookie('refresh_token', refreshToken, cookieOptions)
        res.cookie('logged_in', true, {
            ...cookieOptions, 
            httpOnly: true, 
            maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000
        })

        return res.status(200).json({
            msg: 'Success',
            accessToken,
            refreshToken
        })
    }

    async getAll (req: Request, res: Response) {
        const list: Array<IUser> = await this.UserService.getAll()

    
        res.status(200).json({
            user: list
        })
        
    }
}

export default new AuthController(new UserService, new PasswordService, new TokenService)