import { Router } from 'express';
import categoriaRoutes from './categoria';
import productoRoutes from './Producto';
import ventasRoutes from './venta';
import solicitanteRouter from './solicitante';
import detalleVentaRouter from './detalleVenta';

const routes = Router();


routes.use('/categoria', categoriaRoutes);
routes.use('/producto', productoRoutes)
routes.use('/ventas', ventasRoutes);
routes.use('/solicitante', solicitanteRouter);
routes.use('/detalle-venta', detalleVentaRouter);

export default routes;