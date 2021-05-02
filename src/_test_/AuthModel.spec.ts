import AuthModel from "../models/AuthModel";
import { CODES_AUTH_MESSAGES, ERROR_CODES_AUTH } from "../types/constants/constants";
import db from '../lib/db';

describe('Login', () => {
    afterAll(async done => {
        await db.destroy();
        done();
    });
    it('Función register', async() => {
        const name = Math.random().toString(36).substring(7);
        const email = `${Math.random().toString(36).substring(7)}@gmail.com`;
        const register = await AuthModel.register({
            name,
            email,
            password: `12345`
        });
        if('id' in register){
            expect(register).not.toBeNull();
            expect(register).toBeDefined();
            expect(register.name).not.toBeNull();
            expect(register.id).toBeDefined();
            expect(register.name).toBe(name);
            expect(register.email).toBe(email);
        }
    });
    it('Función login and logout', async() => {
        const name = Math.random().toString(36).substring(7);
        const email = `${Math.random().toString(36).substring(7)}@gmail.com`;
        const password = '12345';
        const register = await AuthModel.register({
            name,
            email,
            password
        });
        if('id' in register){
            expect(register).not.toBeNull();
            expect(register).toBeDefined();
            expect(register.name).not.toBeNull();
            expect(register.id).toBeDefined();
            expect(register.name).toBe(name);
            expect(register.email).toBe(email);

            const login = await AuthModel.login({
                email: register.email,
                password
            });
            if('token' in login){
                expect(login).not.toBeNull();
                expect(login).toBeDefined();
                expect(login.name).not.toBeNull();
                expect(login.token).toBeDefined();
            }
    
            const loginError = await AuthModel.login({
                email: 'noexiste',
                password: 'no password'
            });
            if('error' in loginError){
                expect(loginError).not.toBeNull();
                expect(loginError).toBeDefined();
                expect(loginError.error).not.toBeNull();
                expect(loginError.message).toBeDefined();
                expect(loginError.message).toBe(ERROR_CODES_AUTH.ACCOUNT_NO_EXIST);
            }

            const logout = await AuthModel.logout(register.id);
            if('message' in logout){
                expect(logout).not.toBeNull();
                expect(logout).toBeDefined();
                expect(logout.message).not.toBeNull();
                expect(logout.message).toBe(CODES_AUTH_MESSAGES.LOGOUT_SUCCESS);
            }
        }
    });
});
