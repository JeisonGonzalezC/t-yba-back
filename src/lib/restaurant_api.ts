import axios from 'axios';
import config from "../config/config";
import { IRestaurant, IRestaurantsResponseApi } from '../types/restaurant';

export const getRestaurantsByLatLon = async (opts: IRestaurant):Promise< IRestaurantsResponseApi | undefined> =>{
   try {
        const response = await axios.get(`https://places.ls.hereapi.com/places/v1/discover/explore?apiKey=${config.API_RESTAURANT_KEY}&in=${opts.lat}%2C${opts.lon}%3Br%3D${opts.r}&cat=eat-drink`);
        return response.data as Promise<IRestaurantsResponseApi>;
   } catch (error) {
       console.error(error)
   }
};