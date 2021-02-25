import express from 'express';
import morgan from 'morgan';
import path from 'path';

import indexRoutes from './routes/index';

const app = express();

//settings 
app.set('port', process.env.PORT || 3000);
app.use(express.json());

//middleware
app.use(morgan('dev'));

//routes
app.use("/api", indexRoutes);

//this folder for this app will be used to store public files
app.use("/uploads", express.static(path.resolve('uploads')));

export default app;