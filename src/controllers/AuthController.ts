import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthModel from '../models/AuthModel';
import { ILogin, IRegister, IPayloadUser } from '../types/auth';
import config from '../config/config';

class AuthController {
    public async login(req: Request, res: Response) {
        const login = await AuthModel.login(req.body as ILogin);
        const status = 'error' in login ? login.status : 201 ;
        res.status(status).json(login);
    }

    public async register(req: Request, res: Response) {
        const register = await AuthModel.register(req.body as IRegister);
        const status = 'error' in register ? register.status : 201 ;
        res.status(status).json(register);
    }

    public async logout(req: Request, res: Response) {
        const signLogout = await AuthModel.logout(req.user_id);
        const status = 'error' in signLogout ? signLogout.status : 201 ;
        res.status(status).json(signLogout);
    }
    
    public async tokenValidation(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        if(!authorization){
            return res.status(401).json("Acces denied");
        }
        const token = authorization.split(" ");
        const payload = jwt.verify(token[1], config.PWD_TOKEN) as IPayloadUser;
        if(!payload){
            return res.status(401).json("Acces denied");
        }
        req.user_id = payload.id;
        next();
    }
}
export const authController = new AuthController();