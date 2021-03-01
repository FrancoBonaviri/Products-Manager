import { Router } from 'express';
import categoriaController from '../controllers/categoria'
import { BodyValidator, validBannerCat } from '../middleware/middlewares';
import { body } from 'express-validator';


const categoriaRoutes = Router();



categoriaRoutes.post('/',[
    body('nombre', 'El nombre de la categoria es necesario').notEmpty(),
    body('descripcion', 'La descripcion  de la categoria es necesaria').notEmpty(),
    BodyValidator
], categoriaController.create);


categoriaRoutes.post('/setBanner/:code', validBannerCat ,categoriaController.setBanner );

categoriaRoutes.get('/', categoriaController.getAll ); 

categoriaRoutes.get('/:code', categoriaController.geyByCodigo );

categoriaRoutes.delete('/:code', categoriaController.delete );

categoriaRoutes.put('/:code', [
    body('nombre', 'El nombre de la categoria es necesario').notEmpty(),
    body('descripcion', 'La descripcion  de la categoria es necesaria').notEmpty(),
    BodyValidator
],categoriaController.update );


categoriaRoutes.get('/image/:code', categoriaController.getImage);

export default categoriaRoutes;