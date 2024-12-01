//npm install express
import express from 'express';
//npm install morgan
import morgan from 'morgan';
//npm install --save pg pg-hstore

import { authenticateToken } from './middlewares/authenticate.middleware.js';
//routes
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/task.routes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/api/login', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', authenticateToken, tasksRoutes);
// Settings
//app.set('port', 3000);

export default app;
