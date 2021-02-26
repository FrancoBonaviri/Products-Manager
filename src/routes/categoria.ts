import { Router } from 'express';
import categoriaController from '../controllers/categoria'


const categoriaRoutes = Router();



categoriaRoutes.post('/', categoriaController.create);




export default categoriaRoutes;