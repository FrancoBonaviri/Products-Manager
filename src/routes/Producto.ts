import { Router } from 'express';
import productoController from '../controllers/producto'
import { BodyValidator, addImageProduct, isValidCat, isValidImageProduct } from '../middleware/middlewares';
import { body } from 'express-validator';


const productoRoutes = Router();


productoRoutes.get('/:code', [], productoController.getByCodigo );

productoRoutes.get('/categoria/:code', [
    isValidCat
], productoController.getByCategoria );

productoRoutes.get('/image/:code/:image', [ 
    isValidImageProduct
] , productoController.getImage );

productoRoutes.post('/', [
    body('nombre', 'El nombre es requerido').notEmpty(),
    body('descripcion', 'La descripcion es requerido').notEmpty(),
    body('stock', 'El stock es requerido').notEmpty(),
    body('precio', 'El precio es requerido').notEmpty(),
    body('costo', 'El costo es requerido').notEmpty(),
    body('categoria', 'La categoria es requerido').notEmpty(),
    body('stock','El Stock debe ser un numero').isNumeric(),
    body('precio','El precio debe ser un numero').isNumeric(),
    body('costo', 'El costo debe ser numerico').isNumeric(),
    BodyValidator
], productoController.create);

productoRoutes.put('/update/:code', [] , productoController.update);

productoRoutes.post('/addImage/:code', [ 
    addImageProduct 
], productoController.addImageProduct );


productoRoutes.delete('/image/:code/:image', [
    isValidImageProduct
], productoController.deleteImageProduct );

productoRoutes.delete('/:code', productoController.deleteProduct );

export default productoRoutes