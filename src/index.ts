import express from 'express';
import config from "../src/config/config";
// Routes
import AuthRoutes from './routes/AuthRoutes';
import RestaurantsRoutes from './routes/RestaurantsRoutes';

const app = express();
//Settings
app.set('port', config.PORT || 3002);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/auth', AuthRoutes);
app.use('/restaurant', RestaurantsRoutes)

//Static files

//Starting the server
app.listen(app.get('port'), ()=>{
    console.info(`Server on port ${app.get('port')}`);
});