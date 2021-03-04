import { Router } from 'express';
import productoController from '../controllers/producto'
import { BodyValidator } from '../middleware/middlewares';
import { body } from 'express-validator';


const productoRoutes = Router();

productoRoutes.post('/', [
    body('nombre', 'El nombre es requerido').notEmpty(),
    body('descripcion', 'La descripcion es requerido').notEmpty(),
    body('stock', 'El stock es requerido').notEmpty(),
    body('precio', 'El precio es requerido').notEmpty(),
    body('categoria', 'La categoria es requerido').notEmpty(),
    body('stock','El Stock debe ser un numero').isNumeric(),
    body('precio','El precio debe ser un numero').isNumeric(),
    BodyValidator
], productoController.create);

productoRoutes.put('/update/:code', [] , productoController.update);



export default productoRoutes