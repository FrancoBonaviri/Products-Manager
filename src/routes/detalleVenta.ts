import { Router } from 'express';
import DetalleVentaController from '../controllers/detalleVenta';

const detalleVentaRouter = Router();


detalleVentaRouter.get('/:code', [] , DetalleVentaController.getByCode )

detalleVentaRouter.get('/loadbyventa/:code', [], DetalleVentaController.getByVenta );

detalleVentaRouter.put('/:code/:ventaCode', [], DetalleVentaController.update );

detalleVentaRouter.delete('/:code/:ventaCode', [], DetalleVentaController.delete );


export default detalleVentaRouter;