export interface ILogin {
    email: string;
    password: string;
}
export interface ILoginResponse {
    name: string;
    token: string;
    status_login: boolean;
}
export interface IRegister {
    name: string;
    email: string;
    password?: string;
}
export interface IRegisterResponse {
    id: string;
    name: string;
    email: string;
}
export interface ILogoutResponse {
    status_login: boolean;
    message: string;
}
export interface IPayloadUser{
    id: string;
    iat: number;
    exp: number;
}