//npm install express
import express from 'express';
//npm install morgan
import morgan from 'morgan';
//npm install --save pg pg-hstore
//routes
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/api/login', authRoutes);
app.use('/api/users', usersRoutes);
// Settings
//app.set('port', 3000);

export default app;
