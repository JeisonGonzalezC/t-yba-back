import { Request, Response } from 'express';
import RestaurantModel from '../models/RestaurantModel';
import { IRestaurant } from '../types/restaurant';

class RestaurantController {
    public async transactions(_req: Request, res: Response) {
        const historyTransactions = await RestaurantModel.transactions();
        const status = 'error' in historyTransactions ? historyTransactions.status : 201 ;
        res.status(status).json(historyTransactions);
    }

    public async restaurants(req: Request, res: Response) {
        const { lat, lon, r } = req.params;
        const restaurants = await RestaurantModel.restaurantsByCity({
            lat,
            lon,
            r,
            user_id: req.user_id
        });
        const status = 'error' in restaurants ? restaurants.status : 201 ;
        res.status(status).json(restaurants);
    }
}
export const restaurantController = new RestaurantController();