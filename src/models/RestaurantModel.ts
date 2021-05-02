import { Model, RelationMappings } from 'objection';
import db from '../lib/db';
import { IError } from '../types/error/error';
import { ERROR_CODES_RESTAURANT } from '../types/constants/constants';
import { IRestaurant, IRestaurantsResponseApi } from '../types/restaurant';
import { getRestaurantsByLatLon } from '../lib/restaurant_api';

Model.knex(db);

export default class RestaurantModel extends Model {
    public static tableName = 'restaurants';
    public static idColumn = 'id';
    
    public static relationMappings: RelationMappings = {};
    
    public static async transactions():Promise<RestaurantModel[] | IError>{
        try {
            const transactions = await RestaurantModel.query();
            return transactions;
        } catch (error) {
            return {
                error: true,
                message: error?.message,
                status: 500
            }
        }
    }

    public static async restaurantsByCity(args: IRestaurant):Promise<IRestaurantsResponseApi | IError>{
        const restaurants = await getRestaurantsByLatLon(args);
        try {
            if(restaurants){
                await RestaurantModel.query().insertAndFetch({
                    transaction: args
                });
                return restaurants;
            }else{
                return {
                    error: true,
                    message: ERROR_CODES_RESTAURANT.NO_RESTAURANTS,
                    status: 500
                }
            } 
        } catch (error) {
            return {
                error: true,
                message: error?.message,
                status: 500
            }
        }
    }



    /***************** INSTANCE PROPERTIES *****************/
    public id!: string;
    public transaction!: IRestaurant;
    public created_at!: Date;
    public updated_at!: Date;

    /***************** INSTANCE METHODS *****************/
}