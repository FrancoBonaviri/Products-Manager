import { Router } from 'express';
import categoriaRoutes from './categoria';

const routes = Router();


routes.use('/categoria', categoriaRoutes);



export default routes;