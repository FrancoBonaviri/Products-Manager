import { Router } from 'express';
import categoriaRoutes from './categoria';
import productoRoutes from './Producto';

const routes = Router();


routes.use('/categoria', categoriaRoutes);
routes.use('/producto', productoRoutes)


export default routes;