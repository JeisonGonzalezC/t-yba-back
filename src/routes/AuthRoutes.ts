import { Router } from 'express';
import { authController } from '../controllers/AuthController';

class AuthRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/register', authController.register);
        this.router.post('/login', authController.login);
        this.router.post('/logout', authController.tokenValidation, authController.logout);
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;