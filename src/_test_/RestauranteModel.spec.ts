import db from '../lib/db';
import RestaurantModel from "../models/RestaurantModel";
import AuthModel from "../models/AuthModel";
import { mocked_api_restaurant } from './data_mocked/mocked';

describe('Restaurantes and transacctions', () => {
    afterAll(async done => {
        await db.destroy();
        done();
    });
    it('Función getRestaurantsByGeo', async() => {
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

            const restaurants = await RestaurantModel.restaurantsByCity({
                lat: '5.0628828710255975',
                lon: '-75.50510151530874',
                r: '10000',
                user_id: register.id
            });
            if('results' in restaurants){
                expect(restaurants).not.toBeNull();
                expect(restaurants).toBeDefined();
                expect(restaurants.results?.items).toBeDefined();
            }
        }
    });
});
