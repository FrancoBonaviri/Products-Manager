import { Router } from 'express';
import categoriaRoutes from './categoria';
import productoRoutes from './Producto';
import ventasRoutes from './venta';
import solicitanteRouter from './solicitante';

const routes = Router();


routes.use('/categoria', categoriaRoutes);
routes.use('/producto', productoRoutes)
routes.use('/ventas', ventasRoutes);
routes.use('/solicitante', solicitanteRouter);

export default routes;