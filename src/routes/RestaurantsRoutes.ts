import { Router } from 'express';
import { authController } from '../controllers/AuthController';
import { restaurantController } from '../controllers/RestaurantController';

class RestaurantsRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', authController.tokenValidation, restaurantController.transactions);
        this.router.get('/:lat/:lon/:r', authController.tokenValidation, restaurantController.restaurants);
    }
}
const restaurantsRoutes = new RestaurantsRoutes();
export default restaurantsRoutes.router;