import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import config from './config'

import seriesRoutes from './routes/series.routes';
import queryRoutes from './routes/queries.routes';


const app = express();

//settings 
app.set('port', config.PORT);
app.use(express.json());//entender JSON
app.use(express.urlencoded({extended: false}));//para entender los campos de la URL
app.use(cors());//para poder recibir peticiones de otros servidores

//middleware
app.use(morgan('dev'));

//routes
app.use("/api/series", seriesRoutes);
app.use("/api/question", queryRoutes);

//this folder for this app will be used to store public files
app.use("/uploads", express.static(path.resolve('uploads')));

export default app;