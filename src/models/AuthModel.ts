import jwt from 'jsonwebtoken';
import { ILogin, ILoginResponse, ILogoutResponse, IRegister, IRegisterResponse } from '../types/auth';
import { Model, RelationMappings } from 'objection';
import db from '../lib/db';
import { hash, safeEqual } from '../lib/hash';
import config from "../config/config";
import { IError } from '../types/error/error';
import { CODES_AUTH_MESSAGES, ERROR_CODES_AUTH } from '../types/constants/constants';

Model.knex(db);

export default class AuthModel extends Model {
    public static tableName = 'users';
    public static idColumn = 'id';
    
    public static relationMappings: RelationMappings = {};
    
    public static async register(args: IRegister): Promise<IRegisterResponse | IError>{
        const { name, email, password } = args;
        try {
            if (!name || !email || !password) {
                return {
                    error: true,
                    message: `${ERROR_CODES_AUTH.REQUIRE_EMAIL} 
                            y ${ERROR_CODES_AUTH.REQUIRE_PASSWORD}
                            y ${ERROR_CODES_AUTH.REQUIRE_NAME}`,
                    status: 500
                }
            }
            const account = await AuthModel.getByEmail(email);
            if (account) {
                return {
                    error: true,
                    message: ERROR_CODES_AUTH.ACCOUNT_EXIST,
                    status: 500
                }
            }
            const newUser = await AuthModel.query().insertAndFetch({
                name,
                email,
                password: hash(config.PWD_SALT, password)
            });
            return {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };
        } catch (e) {
            return {
                error: true,
                message: e?.message,
                status: 500
            }
        }
    }

    public static async login(args: ILogin): Promise<ILoginResponse | IError>{
        const { email, password } = args;
        try {
            if (!email || !password) {
                return {
                    error: true,
                    message: `${ERROR_CODES_AUTH.REQUIRE_EMAIL} y ${ERROR_CODES_AUTH.REQUIRE_PASSWORD}`,
                    status: 500
                }
            }
            const account = await AuthModel.getByEmail(email);
            const accountPassword = account && safeEqual(hash(config.PWD_SALT, password), account.password) ? account : null;
            if (!account || !accountPassword) {
                return {
                    error: true,
                    message: ERROR_CODES_AUTH.ACCOUNT_NO_EXIST,
                    status: 500
                }
            }
            await account.$query().updateAndFetch({ 
                status_login: true
            });
            const token: string  = jwt.sign({
                id: account.id,
                name: account.name
            }, config.PWD_TOKEN);
            return {
                name: account.name,
                token,
                status_login: true
            };
        } catch (e) {
            return {
                error: true,
                message: e?.message,
                status: 500
            }
        }
    }


    public static async logout(user_id: string): Promise<ILogoutResponse | IError>{
        try {
            const account = await AuthModel.query().findById(user_id);
            if (!account) {
                return {
                    error: true,
                    message: ERROR_CODES_AUTH.ACCOUNT_NO_EXIST,
                    status: 500
                }
            }
            await account.$query().updateAndFetch({ 
                status_login: false
            });
            return {
                status_login: false,
                message: CODES_AUTH_MESSAGES.LOGOUT_SUCCESS
            };
        } catch (e) {
            return {
                error: true,
                message: e?.message,
                status: 500
            }
        }
    }

    public static async getByEmail(email: string) {
        try {
            if (!email) {
                throw new Error();
            }
            const account = await AuthModel.query()
                .where('email', email.toLowerCase())
                .first();
            return account || null;
        } catch (e) {
            console.error(e?.message)
            return null;
        }
    }

    /***************** INSTANCE PROPERTIES *****************/
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public status_login!: boolean;
    public created_at!: Date;
    public updated_at!: Date;

    /***************** INSTANCE METHODS *****************/
}