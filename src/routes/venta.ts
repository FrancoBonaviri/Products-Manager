import { Router } from 'express';
import ventasController from '../controllers/ventas';
import { body } from 'express-validator'; 
import { BodyValidator, isValidPedidoVenta, isValidDetalleVenta, isValidEstadoVenta } from '../middleware/middlewares';

const ventasRoutes = Router();


ventasRoutes.post('/', [
    body('solicitante', 'Debe indicar un solicitante').notEmpty(),
    body('detalles', 'Debe enviar el detalle del pedido').isArray(),
    BodyValidator,
    isValidPedidoVenta,
    isValidDetalleVenta,
    isValidEstadoVenta
], ventasController.create );

ventasRoutes.put('/confirmar/:code', [], ventasController.confirmarVenta ); 

ventasRoutes.put('/finalizar/:code', [], ventasController.finalizar );

ventasRoutes.get('/:code', [], ventasController.getByCodigo );

ventasRoutes.get('/', [], ventasController.getAll );


export default ventasRoutes;